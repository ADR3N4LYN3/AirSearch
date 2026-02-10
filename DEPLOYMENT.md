# 🚀 Guide de Déploiement AirSearch sur VPS

## 📋 Prérequis

Sur ton VPS, installe :
```bash
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 🔧 Déploiement Rapide

### 1️⃣ Cloner le projet

```bash
cd /opt
sudo git clone https://github.com/ton-username/AirSearch.git
cd AirSearch
```

### 2️⃣ Configurer les variables d'environnement

```bash
sudo nano .env
```

Ajoute :
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyxxxxxxxxxxxxx
NODE_ENV=production
```

### 3️⃣ Configurer ton domaine

Remplace `ton-domaine.com` par ton vrai domaine dans :
```bash
sudo nano nginx/conf.d/airsearch.conf
```

Ligne 22 :
```nginx
server_name example.com www.example.com;  # ← Change ici
```

### 4️⃣ Pointer ton domaine vers le VPS

Dans ton registrar DNS, ajoute :
```
A     @           123.45.67.89  (IP de ton VPS)
A     www         123.45.67.89
```

### 5️⃣ Lancer l'application

```bash
# Démarrer sans SSL (test initial)
sudo docker-compose -f docker-compose.prod.yml up -d

# Vérifier que tout fonctionne
sudo docker-compose -f docker-compose.prod.yml ps
sudo docker-compose -f docker-compose.prod.yml logs -f
```

### 6️⃣ Configurer le SSL (Let's Encrypt)

```bash
# Rendre le script exécutable
sudo chmod +x setup-ssl.sh

# Lancer la config SSL
sudo ./setup-ssl.sh ton-domaine.com
```

Le script va :
- ✅ Obtenir un certificat Let's Encrypt valide
- ✅ Configurer le renouvellement automatique
- ✅ Rediriger HTTP → HTTPS
- ✅ Activer HTTP/2

---

## 🧪 Tests

### Test local (sans domaine)

```bash
# Test HTTP
curl http://localhost/api/health

# Réponse attendue:
# {"status":"healthy","timestamp":"...","uptime":123.45,"environment":"production"}
```

### Test avec domaine

```bash
# Test HTTPS
curl https://ton-domaine.com/api/health

# Test complet
curl -I https://ton-domaine.com
```

Tu devrais voir les headers de sécurité :
```
HTTP/2 200
x-frame-options: DENY
x-content-type-options: nosniff
strict-transport-security: max-age=31536000; includeSubDomains
```

---

## 📊 Monitoring

### Voir les logs

```bash
# Logs de l'app Next.js
sudo docker-compose -f docker-compose.prod.yml logs -f airsearch

# Logs nginx
sudo docker-compose -f docker-compose.prod.yml logs -f nginx

# Logs certbot (renouvellement SSL)
sudo docker-compose -f docker-compose.prod.yml logs certbot
```

### Vérifier l'état

```bash
# Status des containers
sudo docker-compose -f docker-compose.prod.yml ps

# Healthcheck
sudo docker inspect --format='{{.State.Health.Status}}' airsearch-airsearch-1

# Utilisation ressources
sudo docker stats
```

---

## 🔄 Mise à jour de l'application

```bash
cd /opt/AirSearch

# Pull les nouvelles modifications
sudo git pull

# Rebuild et redémarrer
sudo docker-compose -f docker-compose.prod.yml build
sudo docker-compose -f docker-compose.prod.yml up -d

# Vérifier les logs
sudo docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🛡️ Sécurité

### Firewall (UFW)

```bash
# Activer le firewall
sudo ufw enable

# Autoriser SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Vérifier
sudo ufw status
```

### Fail2ban (optionnel mais recommandé)

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📈 Performance

### Vérifier les limites de ressources

```bash
# CPU et RAM utilisés par container
sudo docker stats airsearch-airsearch-1
```

Limites actuelles :
- CPU max: 1.0 core
- RAM max: 1GB
- RAM min: 256MB

### Ajuster les limites si besoin

Édite `docker-compose.prod.yml` :
```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'      # Augmente si VPS puissant
      memory: 2G       # Augmente si besoin
```

Puis redémarre :
```bash
sudo docker-compose -f docker-compose.prod.yml up -d
```

---

## 🐛 Troubleshooting

### L'app ne démarre pas

```bash
# Voir les logs détaillés
sudo docker-compose -f docker-compose.prod.yml logs airsearch

# Vérifier les variables d'env
sudo docker-compose -f docker-compose.prod.yml exec airsearch env | grep ANTHROPIC
```

### Nginx ne démarre pas

```bash
# Tester la config nginx
sudo docker-compose -f docker-compose.prod.yml exec nginx nginx -t

# Logs nginx
sudo docker-compose -f docker-compose.prod.yml logs nginx
```

### SSL ne fonctionne pas

```bash
# Vérifier les certificats
sudo docker-compose -f docker-compose.prod.yml exec certbot certbot certificates

# Renouveler manuellement
sudo docker-compose -f docker-compose.prod.yml exec certbot certbot renew --dry-run
```

### Healthcheck fail

```bash
# Test direct du healthcheck
sudo docker-compose -f docker-compose.prod.yml exec airsearch node -e "require('http').get('http://localhost:3000/api/health', (r) => console.log(r.statusCode))"

# Doit afficher: 200
```

---

## 🗑️ Nettoyage

### Supprimer l'installation

```bash
cd /opt/AirSearch
sudo docker-compose -f docker-compose.prod.yml down -v
cd ..
sudo rm -rf AirSearch
```

### Nettoyer Docker

```bash
# Supprimer images inutilisées
sudo docker system prune -a

# Supprimer volumes inutilisés
sudo docker volume prune
```

---

## 📞 Support

### Commandes rapides

```bash
# Redémarrer tout
sudo docker-compose -f docker-compose.prod.yml restart

# Stopper tout
sudo docker-compose -f docker-compose.prod.yml stop

# Démarrer tout
sudo docker-compose -f docker-compose.prod.yml start

# Voir tous les containers
sudo docker ps -a

# Inspecter un container
sudo docker inspect airsearch-airsearch-1
```

### Logs structurés

Tous les logs sont dans `/var/log/nginx/` :
- `airsearch_access.log` - Requêtes HTTP
- `airsearch_error.log` - Erreurs nginx

---

## ✅ Checklist finale

Avant de mettre en production :

- [ ] `.env` configuré avec les bonnes clés API
- [ ] Domaine pointé vers le VPS (A records)
- [ ] Docker containers démarrés et healthy
- [ ] SSL activé (certificat Let's Encrypt valide)
- [ ] Healthcheck passe (`/api/health` retourne 200)
- [ ] Firewall configuré (ports 80, 443 ouverts)
- [ ] Logs accessibles et pas d'erreurs
- [ ] Test manuel de recherche fonctionne
- [ ] Headers de sécurité présents (curl -I)

---

**🎉 Ton AirSearch est maintenant en production avec SSL et reverse proxy ! 🚀**
