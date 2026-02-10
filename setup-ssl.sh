#!/bin/bash

# Script de setup SSL pour AirSearch avec Certbot
# Usage: ./setup-ssl.sh ton-domaine.com

set -e

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
    echo "❌ Usage: ./setup-ssl.sh ton-domaine.com"
    exit 1
fi

echo "🚀 Configuration SSL pour: $DOMAIN"

# 1. Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p nginx/conf.d
mkdir -p certbot/conf
mkdir -p certbot/www

# 2. Générer un certificat self-signed temporaire
echo "🔐 Génération du certificat temporaire..."
docker run --rm -v $(pwd)/certbot/conf:/etc/letsencrypt \
    certbot/certbot \
    certonly --standalone --register-unsafely-without-email --agree-tos \
    --staging -d $DOMAIN || true

# 3. Obtenir le vrai certificat Let's Encrypt
echo "🔒 Obtention du certificat Let's Encrypt..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Attendre que nginx démarre
sleep 5

# Obtenir le certificat
docker-compose -f docker-compose.prod.yml run --rm certbot \
    certonly --webroot --webroot-path=/var/www/certbot \
    --email admin@$DOMAIN --agree-tos --no-eff-email \
    -d $DOMAIN -d www.$DOMAIN

# 4. Mettre à jour la config nginx avec le vrai certificat
echo "📝 Mise à jour de la configuration nginx..."
sed -i "s|server_name _;|server_name $DOMAIN www.$DOMAIN;|g" nginx/conf.d/airsearch.conf
sed -i "s|# ssl_certificate /etc/letsencrypt|ssl_certificate /etc/letsencrypt|g" nginx/conf.d/airsearch.conf
sed -i "s|ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;|# ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;|g" nginx/conf.d/airsearch.conf
sed -i "s|ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;|# ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;|g" nginx/conf.d/airsearch.conf

# 5. Redémarrer nginx
echo "🔄 Redémarrage nginx avec SSL..."
docker-compose -f docker-compose.prod.yml restart nginx

# 6. Tester la config
echo "✅ Test de la configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo ""
echo "🎉 Configuration SSL terminée !"
echo ""
echo "🌐 Ton site est accessible sur:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "🔄 Le certificat sera renouvelé automatiquement tous les 12h"
echo ""
echo "📊 Commandes utiles:"
echo "   docker-compose -f docker-compose.prod.yml logs -f nginx"
echo "   docker-compose -f docker-compose.prod.yml ps"
echo "   curl https://$DOMAIN/api/health"
