export interface Destination {
  slug: string;
  name: string;
  region: string;
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introText: string;
  whyVisit: {
    title: string;
    content: string;
  };
  popularQuarters: {
    name: string;
    description: string;
  }[];
  attractions: string[];
  searchKeywords: string[];
  avgPrice: string;
  bestSeason: string;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France",
    description:
      "La capitale française, ville lumière et destination touristique mondiale par excellence.",
    shortDescription:
      "Découvrez la magie de Paris avec ses monuments iconiques, ses quartiers historiques et sa gastronomie raffinée.",
    metaTitle:
      "Location vacances à Paris - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Trouvez votre location de vacances à Paris. Comparez les offres Airbnb, Booking et Abritel en temps réel. Appartements du Marais à Montmartre dès 80€/nuit.",
    h1: "Location vacances à Paris - Comparez Airbnb, Booking & Abritel",
    introText: `Paris, la ville lumière, attire chaque année des millions de visiteurs en quête d'art, de culture et de gastronomie. Que vous recherchiez un appartement cosy dans le Marais, un studio élégant près de la Tour Eiffel ou un logement spacieux à Montmartre, AirSearch compare instantanément les meilleures offres de location sur Airbnb, Booking.com et Abritel.

Notre comparateur intelligent vous permet de trouver le logement idéal selon vos critères : budget, quartier, équipements et dates de séjour. Profitez de prix transparents et d'un large choix d'hébergements pour vivre une expérience authentique dans la capitale française.

Réservez votre location de vacances à Paris en quelques clics et préparez-vous à découvrir les Champs-Élysées, le Louvre, Notre-Dame et bien d'autres merveilles parisiennes.`,
    whyVisit: {
      title: "Pourquoi choisir Paris pour vos vacances ?",
      content: `Paris combine histoire millénaire et modernité dynamique. Chaque arrondissement offre une atmosphère unique : du charme bohème de Montmartre à l'élégance du 7ème arrondissement, en passant par l'effervescence du Quartier Latin. La ville propose une offre culturelle incomparable avec ses musées de renommée mondiale, ses théâtres, ses cafés historiques et sa scène gastronomique étoilée. En choisissant une location de vacances plutôt qu'un hôtel, vous vivrez Paris comme un véritable parisien, avec la liberté de cuisiner vos croissants du matin et de vous installer dans un vrai chez-vous.`,
    },
    popularQuarters: [
      {
        name: "Le Marais",
        description:
          "Quartier historique avec ruelles pavées, boutiques vintage, galeries d'art et vie nocturne animée. Idéal pour les amateurs de culture et d'authenticité.",
      },
      {
        name: "Montmartre",
        description:
          "Colline bohème dominée par le Sacré-Cœur, célèbre pour ses artistes de rue, ses cabarets et sa vue panoramique sur Paris.",
      },
      {
        name: "Saint-Germain-des-Prés",
        description:
          "Quartier chic et intellectuel, berceau de l'existentialisme avec ses cafés littéraires, ses boutiques de luxe et ses galeries d'art.",
      },
      {
        name: "Canal Saint-Martin",
        description:
          "Zone tendance et décontractée appréciée des jeunes parisiens, avec ses écluses pittoresques, ses cafés branchés et son ambiance bohème.",
      },
    ],
    attractions: [
      "Tour Eiffel",
      "Musée du Louvre",
      "Notre-Dame de Paris",
      "Arc de Triomphe",
      "Sacré-Cœur",
      "Champs-Élysées",
      "Musée d'Orsay",
      "Versailles",
      "Disneyland Paris",
      "Quartier Latin",
    ],
    searchKeywords: [
      "location paris",
      "appartement paris",
      "airbnb paris",
      "logement paris centre",
      "location vacances paris",
      "hébergement paris",
    ],
    avgPrice: "80-150€",
    bestSeason: "Printemps et Automne",
    image: "/destinations/paris.jpg",
  },
  {
    slug: "nice",
    name: "Nice",
    region: "Provence-Alpes-Côte d'Azur",
    description:
      "La perle de la Côte d'Azur, entre mer Méditerranée et montagnes, célèbre pour sa Promenade des Anglais.",
    shortDescription:
      "Profitez du soleil méditerranéen à Nice avec ses plages, son vieux-ville coloré et sa douceur de vivre légendaire.",
    metaTitle:
      "Location vacances à Nice - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Louez un appartement à Nice sur la Côte d'Azur. Comparez Airbnb, Booking et Abritel pour trouver votre logement vue mer ou dans le Vieux-Nice dès 70€/nuit.",
    h1: "Location vacances à Nice - Comparez Airbnb, Booking & Abritel",
    introText: `Nice, capitale de la Côte d'Azur, séduit par son climat ensoleillé, sa célèbre Promenade des Anglais et son patrimoine culturel riche. Que vous rêviez d'un studio avec vue sur la Baie des Anges, d'un appartement dans le pittoresque Vieux-Nice ou d'une villa à Cimiez, AirSearch compare pour vous les meilleures offres de location sur toutes les plateformes majeures.

Notre technologie de comparaison intelligente analyse en temps réel les disponibilités sur Airbnb, Booking.com et Abritel pour vous proposer le meilleur rapport qualité-prix. Filtrez par quartier, proximité de la plage, équipements ou budget pour trouver votre hébergement idéal.

Vivez des vacances inoubliables entre mer turquoise et arrière-pays provençal, avec 300 jours de soleil par an et une gastronomie méditerranéenne authentique.`,
    whyVisit: {
      title: "Pourquoi Nice est la destination parfaite pour vos vacances ?",
      content: `Nice offre un mélange unique de culture italienne et française, avec son architecture Belle Époque, ses marchés colorés et sa cuisine fusion. La ville bénéficie d'un microclimat exceptionnel qui permet de profiter de la plage même en hiver. Au-delà des plages, Nice est un point de départ idéal pour explorer Monaco, Cannes, Antibes et les villages perchés de l'arrière-pays. En choisissant une location de vacances, vous pourrez cuisiner avec les produits frais du Cours Saleya et vivre au rythme méditerranéen dans votre propre espace.`,
    },
    popularQuarters: [
      {
        name: "Vieux-Nice",
        description:
          "Cœur historique aux ruelles étroites et colorées, marché aux fleurs, restaurants typiques et ambiance italienne authentique.",
      },
      {
        name: "Promenade des Anglais",
        description:
          "Célèbre front de mer bordé de palmiers avec vue imprenable sur la Méditerranée, plages et hôtels de luxe.",
      },
      {
        name: "Libération",
        description:
          "Quartier dynamique et résidentiel, prisé des locaux avec son marché quotidien, ses commerces de proximité et son authenticité.",
      },
      {
        name: "Cimiez",
        description:
          "Quartier résidentiel et chic sur les hauteurs, abritant les musées Matisse et Chagall, ainsi que les arènes romaines.",
      },
    ],
    attractions: [
      "Promenade des Anglais",
      "Vieux-Nice",
      "Colline du Château",
      "Musée Matisse",
      "Cours Saleya",
      "Place Masséna",
      "Port de Nice",
      "Musée Marc Chagall",
      "Monastère de Cimiez",
      "Parc Phoenix",
    ],
    searchKeywords: [
      "location nice",
      "appartement nice",
      "airbnb nice",
      "logement côte d'azur",
      "location vacances nice",
      "hébergement nice bord de mer",
    ],
    avgPrice: "70-130€",
    bestSeason: "Mai à Septembre",
    image: "/destinations/nice.jpg",
  },
  {
    slug: "lyon",
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    description:
      "Capitale de la gastronomie française, Lyon enchante par ses traboules, ses bouchons et son patrimoine UNESCO.",
    shortDescription:
      "Explorez Lyon, ville UNESCO de la gastronomie, avec ses quartiers historiques et sa scène culinaire exceptionnelle.",
    metaTitle:
      "Location vacances à Lyon - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Réservez votre logement à Lyon. Comparez Airbnb, Booking et Abritel pour des locations dans le Vieux-Lyon, Presqu'île ou Croix-Rousse dès 60€/nuit.",
    h1: "Location vacances à Lyon - Comparez Airbnb, Booking & Abritel",
    introText: `Lyon, troisième ville de France et capitale mondiale de la gastronomie, offre un cadre exceptionnel pour vos vacances. Que vous recherchiez un appartement dans le Vieux-Lyon classé UNESCO, un loft moderne dans la Confluence ou un logement typique à la Croix-Rousse, AirSearch simplifie votre recherche en comparant automatiquement Airbnb, Booking.com et Abritel.

Notre comparateur intelligent vous fait gagner du temps et de l'argent en affichant toutes les options disponibles selon vos critères. Découvrez des logements authentiques dans les traboules historiques, des appartements avec vue sur les fleuves Rhône et Saône, ou des hébergements modernes dans les quartiers rénovés.

Préparez-vous à déguster la cuisine lyonnaise dans les bouchons traditionnels, à explorer les pentes de la Croix-Rousse et à découvrir pourquoi Lyon est inscrite au patrimoine mondial de l'UNESCO.`,
    whyVisit: {
      title: "Pourquoi Lyon est une destination incontournable ?",
      content: `Lyon combine patrimoine historique et dynamisme contemporain. La ville offre une qualité de vie exceptionnelle avec ses parcs, ses berges aménagées et sa scène culturelle vibrante. Capitale de la gastronomie, Lyon compte plus de bouchons et restaurants étoilés au mètre carré que nulle part ailleurs. Le Vieux-Lyon avec ses traboules Renaissance, la Presqu'île bourgeoise et la Croix-Rousse ouvrière forment un triptyque architectural unique. En louant un appartement, vous pourrez vivre comme un vrai Lyonnais, faire votre marché aux Halles Paul Bocuse et profiter des festivals qui animent la ville toute l'année.`,
    },
    popularQuarters: [
      {
        name: "Vieux-Lyon",
        description:
          "Quartier Renaissance inscrit à l'UNESCO, célèbre pour ses traboules secrètes, ses bouchons authentiques et son architecture médiévale.",
      },
      {
        name: "Presqu'île",
        description:
          "Centre névralgique entre Rhône et Saône, concentrant shopping, culture, restaurants et architecture haussmannienne élégante.",
      },
      {
        name: "Croix-Rousse",
        description:
          "Colline des canuts, ancien quartier des soyeux, aujourd'hui quartier bohème et artistique avec ses pentes, son marché et son esprit village.",
      },
      {
        name: "Confluence",
        description:
          "Quartier ultra-moderne au confluent des deux fleuves, architecture contemporaine, musées innovants et développement durable.",
      },
    ],
    attractions: [
      "Vieux-Lyon et traboules",
      "Basilique de Fourvière",
      "Parc de la Tête d'Or",
      "Musée des Confluences",
      "Halles Paul Bocuse",
      "Place Bellecour",
      "Opéra de Lyon",
      "Musée des Beaux-Arts",
      "Théâtres romains",
      "Berges du Rhône",
    ],
    searchKeywords: [
      "location lyon",
      "appartement lyon",
      "airbnb lyon",
      "logement lyon centre",
      "location vacances lyon",
      "hébergement vieux-lyon",
    ],
    avgPrice: "60-110€",
    bestSeason: "Toute l'année",
    image: "/destinations/lyon.jpg",
  },
  {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    description:
      "Cité phocéenne millénaire et porte de la Méditerranée, Marseille vibre d'authenticité et de diversité.",
    shortDescription:
      "Découvrez Marseille, ville méditerranéenne vibrante avec son Vieux-Port, ses calanques et sa culture provençale unique.",
    metaTitle:
      "Location vacances à Marseille - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Trouvez votre location à Marseille proche du Vieux-Port ou des Calanques. Comparez Airbnb, Booking et Abritel pour des logements dès 55€/nuit.",
    h1: "Location vacances à Marseille - Comparez Airbnb, Booking & Abritel",
    introText: `Marseille, plus ancienne ville de France et deuxième plus grande métropole, offre une expérience méditerranéenne authentique et cosmopolite. Que vous cherchiez un appartement près du Vieux-Port, un logement avec vue sur Notre-Dame de la Garde ou une maison proche des Calanques, AirSearch compare instantanément les offres sur Airbnb, Booking.com et Abritel.

Notre plateforme intelligente analyse les milliers d'hébergements disponibles pour vous présenter les meilleures options selon votre budget, vos dates et vos préférences. De la cité phocéenne historique aux quartiers rénovés du MuCEM, trouvez le logement qui transformera votre séjour marseillais en expérience mémorable.

Préparez-vous à explorer le Panier coloré, à déguster une bouillabaisse authentique et à randonner dans les Calanques, le tout depuis votre location de vacances idéale.`,
    whyVisit: {
      title: "Pourquoi Marseille mérite votre visite ?",
      content: `Marseille est une ville de contrastes et d'authenticité, loin des clichés touristiques. Bénéficiant de 300 jours de soleil par an, elle offre un accès unique entre ville culturelle et nature préservée avec le Parc National des Calanques à ses portes. La diversité culturelle de Marseille se reflète dans sa gastronomie, son marché aux poissons du Vieux-Port et ses quartiers cosmopolites. Capitale européenne de la culture en 2013, la ville a su se réinventer tout en préservant son âme provençale. En louant un appartement, vous découvrirez le vrai Marseille, celui des marchés de quartier, des petits ports cachés et des couchers de soleil sur la mer.`,
    },
    popularQuarters: [
      {
        name: "Vieux-Port",
        description:
          "Cœur historique et touristique de Marseille, marché aux poissons, terrasses de restaurants, départ pour les îles du Frioul.",
      },
      {
        name: "Le Panier",
        description:
          "Plus ancien quartier de Marseille, ruelles colorées, street art, galeries artisanales et ambiance village méditerranéen authentique.",
      },
      {
        name: "Prado - Plages",
        description:
          "Quartier résidentiel en bord de mer avec ses plages urbaines, la Corniche Kennedy, restaurants et promenade littorale.",
      },
      {
        name: "Joliette - MuCEM",
        description:
          "Quartier des docks rénové, architecture contemporaine, musées modernes, nouveau centre culturel dynamique de Marseille.",
      },
    ],
    attractions: [
      "Vieux-Port",
      "Notre-Dame de la Garde",
      "MuCEM",
      "Calanques de Cassis",
      "Château d'If",
      "Le Panier",
      "Palais Longchamp",
      "Corniche Kennedy",
      "Stade Vélodrome",
      "Îles du Frioul",
    ],
    searchKeywords: [
      "location marseille",
      "appartement marseille",
      "airbnb marseille",
      "logement vieux-port",
      "location vacances marseille",
      "hébergement calanques",
    ],
    avgPrice: "55-100€",
    bestSeason: "Mai à Octobre",
    image: "/destinations/marseille.jpg",
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    description:
      "Capitale mondiale du vin et ville UNESCO, Bordeaux charme par son architecture du XVIIIe siècle et sa douceur de vivre.",
    shortDescription:
      "Vivez l'art de vivre bordelais entre patrimoine UNESCO, vignobles prestigieux et gastronomie raffinée.",
    metaTitle:
      "Location vacances à Bordeaux - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Louez un appartement à Bordeaux, capitale du vin. Comparez Airbnb, Booking et Abritel pour des logements centre-ville ou proche vignobles dès 65€/nuit.",
    h1: "Location vacances à Bordeaux - Comparez Airbnb, Booking & Abritel",
    introText: `Bordeaux, capitale mondiale du vin et ville classée UNESCO, offre un cadre élégant pour vos vacances entre patrimoine architectural et art de vivre. Que vous souhaitiez un appartement dans le quartier historique des Chartrons, un loft moderne près de la Cité du Vin ou un logement en centre-ville près de la Place de la Bourse, AirSearch compare pour vous toutes les plateformes de location.

Notre comparateur intelligent scanne Airbnb, Booking.com et Abritel pour vous présenter les meilleures offres d'hébergement selon vos critères. Découvrez des appartements avec cachet dans des immeubles en pierre blonde, des studios design ou des maisons bordelaises traditionnelles.

Préparez-vous à explorer les vignobles prestigieux, à flâner le long des quais de Garonne et à savourer la gastronomie du Sud-Ouest dans une ville où tradition et modernité se marient harmonieusement.`,
    whyVisit: {
      title: "Pourquoi Bordeaux est la destination vin et culture par excellence ?",
      content: `Bordeaux a su se transformer en métropole moderne tout en préservant son patrimoine exceptionnel. La moitié de la ville est classée UNESCO, offrant un décor architectural grandiose du XVIIIe siècle. Au-delà du vin, Bordeaux séduit par sa scène gastronomique innovante, ses quais réaménagés, son tram design et sa proximité avec l'océan Atlantique et le Bassin d'Arcachon. La ville est le point de départ idéal pour explorer les prestigieux vignobles de Médoc, Saint-Émilion et Pomerol. En louant un appartement, vous pourrez vivre au rythme bordelais, faire vos courses au marché des Capucins et profiter des nombreux festivals qui animent la ville.`,
    },
    popularQuarters: [
      {
        name: "Chartrons",
        description:
          "Quartier historique des négociants en vin, aujourd'hui branché avec ses brocantes, galeries d'art, restaurants bio et ambiance bohème-chic.",
      },
      {
        name: "Saint-Pierre",
        description:
          "Cœur médiéval de Bordeaux, ruelles piétonnes, Place de la Bourse, restaurants traditionnels et boutiques dans un cadre historique préservé.",
      },
      {
        name: "Victoire - Saint-Michel",
        description:
          "Quartier étudiant et multiculturel, marché aux puces animé, basilique gothique, bars et vie nocturne dynamique.",
      },
      {
        name: "Bassins à Flot",
        description:
          "Ancien port industriel entièrement rénové, Cité du Vin, architecture contemporaine, bars à vin et espaces culturels innovants.",
      },
    ],
    attractions: [
      "Place de la Bourse",
      "Cité du Vin",
      "Cathédrale Saint-André",
      "Quais de Bordeaux",
      "Grosse Cloche",
      "Rue Sainte-Catherine",
      "Darwin Écosystème",
      "Jardin Public",
      "Vignobles de Bordeaux",
      "Dune du Pilat",
    ],
    searchKeywords: [
      "location bordeaux",
      "appartement bordeaux",
      "airbnb bordeaux",
      "logement centre bordeaux",
      "location vacances bordeaux",
      "hébergement vignobles",
    ],
    avgPrice: "65-120€",
    bestSeason: "Printemps et Automne",
    image: "/destinations/bordeaux.jpg",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATIONS.map((d) => d.slug);
}
