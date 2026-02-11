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
      "Sacré-Cœur de Montmartre",
      "Champs-Élysées",
      "Musée d'Orsay",
      "Jardin du Luxembourg",
      "Château de Versailles",
      "Centre Pompidou",
      "Sainte-Chapelle",
      "Panthéon",
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
      "Profitez du soleil méditerranéen à Nice avec ses plages, sa vieille ville colorée et sa douceur de vivre légendaire.",
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
      "Port Lympia",
      "Musée Marc Chagall",
      "Cathédrale Saint-Nicolas",
      "Parc Phoenix",
      "Monastère de Cimiez",
      "MAMAC",
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
      "Basilique Notre-Dame de Fourvière",
      "Parc de la Tête d'Or",
      "Musée des Confluences",
      "Halles Paul Bocuse",
      "Place Bellecour",
      "Théâtres romains de Fourvière",
      "Musée des Beaux-Arts",
      "Fresque des Lyonnais",
      "Presqu'île",
      "Berges du Rhône",
      "Institut Lumière",
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
      "Parc National des Calanques",
      "Château d'If",
      "Le Panier",
      "Palais Longchamp",
      "Corniche Kennedy",
      "Îles du Frioul",
      "Vallon des Auffes",
      "Fort Saint-Jean",
      "Plage des Catalans",
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
      "Place de la Bourse et Miroir d'Eau",
      "Cité du Vin",
      "Cathédrale Saint-André",
      "Quais de Bordeaux",
      "Grosse Cloche",
      "Rue Sainte-Catherine",
      "Saint-Émilion",
      "Jardin Public",
      "Bassin des Lumières",
      "Dune du Pilat",
      "Darwin Écosystème",
      "Marché des Capucins",
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
  {
    slug: "strasbourg",
    name: "Strasbourg",
    region: "Grand Est",
    description:
      "Capitale européenne au cœur de l'Alsace, Strasbourg séduit par son patrimoine médiéval et son fameux marché de Noël.",
    shortDescription:
      "Plongez dans le charme alsacien de Strasbourg, entre maisons à colombages, cathédrale gothique et marchés de Noël féeriques.",
    metaTitle:
      "Location vacances à Strasbourg - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Louez un appartement à Strasbourg en Alsace. Comparez Airbnb, Booking et Abritel pour des logements dans la Petite France ou le centre historique dès 60€/nuit.",
    h1: "Location vacances à Strasbourg - Comparez Airbnb, Booking & Abritel",
    introText: `Strasbourg, capitale européenne et joyau de l'Alsace, offre un mélange unique de culture française et germanique. Que vous recherchiez un appartement typique dans la Petite France, un logement près de la majestueuse cathédrale ou un hébergement moderne dans le quartier européen, AirSearch compare instantanément les meilleures offres sur Airbnb, Booking.com et Abritel.

Notre comparateur intelligent vous permet de trouver le logement idéal selon vos critères : budget, quartier, équipements et dates de séjour. Profitez de prix transparents et d'un large choix d'hébergements pour vivre une expérience authentique dans cette ville classée au patrimoine mondial de l'UNESCO.

Préparez-vous à flâner dans les ruelles pittoresques, à déguster une choucroute garnie et à découvrir les célèbres marchés de Noël qui font la renommée mondiale de Strasbourg.`,
    whyVisit: {
      title: "Pourquoi choisir Strasbourg pour vos vacances ?",
      content: `Strasbourg est une ville à taille humaine qui se découvre idéalement à pied ou à vélo. Son centre historique, la Grande Île, est inscrit au patrimoine mondial de l'UNESCO et offre un décor de carte postale avec ses maisons à colombages et ses canaux. La ville est également le siège du Parlement européen et du Conseil de l'Europe, lui conférant une dimension internationale unique. La gastronomie alsacienne – choucroute, tarte flambée, bretzel, vins d'Alsace – est un véritable art de vivre. En période de Noël, Strasbourg se transforme en "Capitale de Noël" avec ses marchés enchanteurs. En louant un appartement, vous pourrez vivre au rythme alsacien et profiter des winstubs traditionnelles.`,
    },
    popularQuarters: [
      {
        name: "Petite France",
        description:
          "Quartier le plus pittoresque avec ses maisons à colombages, ses canaux et ses ponts couverts. Ambiance médiévale et romantique garantie.",
      },
      {
        name: "Centre historique - Grande Île",
        description:
          "Cœur de Strasbourg classé UNESCO, autour de la cathédrale. Rues piétonnes, boutiques, restaurants et architecture Renaissance.",
      },
      {
        name: "Krutenau",
        description:
          "Quartier étudiant et branché, ancien faubourg de pêcheurs, aujourd'hui animé avec ses bars, restaurants et ambiance bohème.",
      },
      {
        name: "Quartier européen",
        description:
          "Quartier moderne abritant les institutions européennes, le Parc de l'Orangerie et des espaces verts apaisants.",
      },
    ],
    attractions: [
      "Cathédrale Notre-Dame de Strasbourg",
      "Petite France",
      "Ponts Couverts",
      "Barrage Vauban",
      "Palais Rohan",
      "Parc de l'Orangerie",
      "Parlement Européen",
      "Musée Alsacien",
      "Place Kléber",
      "Marché de Noël",
      "Musée d'Art Moderne",
      "Cave des Hospices de Strasbourg",
    ],
    searchKeywords: [
      "location strasbourg",
      "appartement strasbourg",
      "airbnb strasbourg",
      "logement petite france",
      "location vacances alsace",
      "hébergement strasbourg centre",
    ],
    avgPrice: "60-110€",
    bestSeason: "Décembre et Été",
    image: "/destinations/strasbourg.jpg",
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    region: "Occitanie",
    description:
      "La Ville Rose, capitale de l'aéronautique et du rugby, séduit par son architecture en briques roses et son art de vivre occitan.",
    shortDescription:
      "Explorez Toulouse, la Ville Rose, entre patrimoine roman, Canal du Midi et effervescence de la capitale occitane.",
    metaTitle:
      "Location vacances à Toulouse - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Trouvez votre location de vacances à Toulouse. Comparez Airbnb, Booking et Abritel pour des appartements dans le centre historique ou les bords du Canal du Midi dès 55€/nuit.",
    h1: "Location vacances à Toulouse - Comparez Airbnb, Booking & Abritel",
    introText: `Toulouse, la Ville Rose, doit son surnom à ses façades en briques roses qui s'illuminent au soleil couchant. Quatrième ville de France, elle combine dynamisme économique et douceur de vivre méridionale. Que vous cherchiez un appartement place du Capitole, un loft au bord du Canal du Midi ou un logement dans le quartier animé de Saint-Cyprien, AirSearch compare pour vous les meilleures offres de location.

Notre technologie de comparaison intelligente analyse en temps réel les disponibilités sur Airbnb, Booking.com et Abritel pour vous proposer le meilleur rapport qualité-prix. Filtrez par quartier, budget et équipements pour trouver votre hébergement idéal.

Préparez-vous à découvrir la Basilique Saint-Sernin, à flâner le long du Canal du Midi et à vibrer au rythme du rugby et de la fête dans cette ville chaleureuse et festive.`,
    whyVisit: {
      title: "Pourquoi Toulouse est une destination incontournable ?",
      content: `Toulouse offre un cadre de vie exceptionnel entre soleil, culture et gastronomie du Sud-Ouest. La ville possède un patrimoine architectural remarquable avec ses églises romanes, ses hôtels particuliers Renaissance et le Canal du Midi classé UNESCO. Capitale de l'aéronautique européenne, elle propose des expériences uniques comme la visite de la Cité de l'Espace ou d'Airbus. La scène gastronomique est riche avec le cassoulet, le foie gras et les violettes de Toulouse. En louant un appartement, vous profiterez de l'ambiance conviviale des marchés et des terrasses ensoleillées de cette ville où il fait bon vivre.`,
    },
    popularQuarters: [
      {
        name: "Capitole - Hypercentre",
        description:
          "Cœur battant de Toulouse avec sa place emblématique, ses rues piétonnes, restaurants, boutiques et monuments historiques.",
      },
      {
        name: "Saint-Cyprien",
        description:
          "Quartier rive gauche dynamique et populaire, avec les Abattoirs, la Prairie des Filtres et une ambiance festive.",
      },
      {
        name: "Carmes - Saint-Étienne",
        description:
          "Quartier chic et résidentiel, marché couvert historique, terrasses de cafés et proximité avec les jardins.",
      },
      {
        name: "Saint-Michel",
        description:
          "Quartier étudiant et multiculturel, ambiance populaire, marchés aux puces et vie nocturne animée.",
      },
    ],
    attractions: [
      "Place du Capitole",
      "Basilique Saint-Sernin",
      "Canal du Midi",
      "Cité de l'Espace",
      "Couvent des Jacobins",
      "Musée des Augustins",
      "Pont Neuf",
      "Prairie des Filtres",
      "Les Abattoirs",
      "Halle de la Machine",
      "Jardin Japonais",
      "Marché Victor Hugo",
    ],
    searchKeywords: [
      "location toulouse",
      "appartement toulouse",
      "airbnb toulouse",
      "logement toulouse centre",
      "location vacances toulouse",
      "hébergement ville rose",
    ],
    avgPrice: "55-100€",
    bestSeason: "Avril à Octobre",
    image: "/destinations/toulouse.jpg",
  },
  {
    slug: "montpellier",
    name: "Montpellier",
    region: "Occitanie",
    description:
      "Ville méditerranéenne dynamique et étudiante, Montpellier allie patrimoine médiéval, architecture moderne et plages à proximité.",
    shortDescription:
      "Découvrez Montpellier, ville ensoleillée entre Méditerranée et Cévennes, avec son centre historique vibrant et ses plages proches.",
    metaTitle:
      "Location vacances à Montpellier - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Louez un appartement à Montpellier. Comparez Airbnb, Booking et Abritel pour des logements dans l'Écusson ou proche des plages dès 50€/nuit.",
    h1: "Location vacances à Montpellier - Comparez Airbnb, Booking & Abritel",
    introText: `Montpellier, perle du sud de la France, séduit par son ensoleillement exceptionnel, son centre historique médiéval et sa proximité avec la mer Méditerranée. Que vous recherchiez un appartement dans le quartier de l'Écusson, un logement moderne à Antigone ou un hébergement proche des plages, AirSearch compare pour vous les meilleures offres sur toutes les plateformes.

Notre comparateur intelligent scanne Airbnb, Booking.com et Abritel pour vous présenter les meilleures options d'hébergement selon vos critères. Découvrez des appartements avec cachet dans les ruelles médiévales ou des logements contemporains dans les quartiers rénovés.

Préparez-vous à explorer une ville où l'histoire côtoie la modernité, à profiter des plages méditerranéennes à seulement 15 minutes du centre et à savourer la gastronomie languedocienne.`,
    whyVisit: {
      title: "Pourquoi Montpellier est la destination soleil idéale ?",
      content: `Montpellier bénéficie de plus de 300 jours de soleil par an et offre un cadre de vie exceptionnel entre mer et arrière-pays. Son centre historique, l'Écusson, est un dédale de ruelles médiévales regorgeant de boutiques, restaurants et hôtels particuliers. La ville est aussi résolument moderne avec le quartier Antigone dessiné par Ricardo Bofill et le tramway design. Avec sa population jeune et étudiante, Montpellier vibre d'énergie culturelle et festive. Les plages de Palavas-les-Flots ou Carnon ne sont qu'à 15 minutes en tramway. En louant un appartement, vous profiterez de la douceur de vivre méridionale et des marchés colorés.`,
    },
    popularQuarters: [
      {
        name: "L'Écusson",
        description:
          "Centre historique médiéval piétonnier, ruelles pavées, hôtels particuliers, Place de la Comédie et ambiance animée.",
      },
      {
        name: "Antigone",
        description:
          "Quartier d'architecture néo-classique moderne, signé Ricardo Bofill. Proche du centre commercial Odysseum et du Lez.",
      },
      {
        name: "Beaux-Arts",
        description:
          "Quartier résidentiel prisé, proximité du Musée Fabre, restaurants de qualité et ambiance bourgeoise.",
      },
      {
        name: "Port Marianne",
        description:
          "Quartier moderne en bord du Lez, architecture contemporaine, espaces verts et restaurants tendance.",
      },
    ],
    attractions: [
      "Place de la Comédie",
      "Musée Fabre",
      "Promenade du Peyrou",
      "Arc de Triomphe de Montpellier",
      "Cathédrale Saint-Pierre",
      "Jardin des Plantes",
      "Quartier Antigone",
      "Aquarium Mare Nostrum",
      "Plages de Palavas-les-Flots",
      "Tour de la Babote",
      "Opéra Comédie",
      "Pic Saint-Loup",
    ],
    searchKeywords: [
      "location montpellier",
      "appartement montpellier",
      "airbnb montpellier",
      "logement ecusson",
      "location vacances montpellier",
      "hébergement montpellier plage",
    ],
    avgPrice: "50-95€",
    bestSeason: "Mai à Octobre",
    image: "/destinations/montpellier.jpg",
  },
  {
    slug: "biarritz",
    name: "Biarritz",
    region: "Nouvelle-Aquitaine",
    description:
      "Station balnéaire élégante du Pays Basque, Biarritz est la capitale européenne du surf et un joyau de la côte atlantique.",
    shortDescription:
      "Vivez l'élégance balnéaire de Biarritz, entre vagues de l'Atlantique, patrimoine Belle Époque et culture basque authentique.",
    metaTitle:
      "Location vacances à Biarritz - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Trouvez votre location à Biarritz au Pays Basque. Comparez Airbnb, Booking et Abritel pour des logements vue mer ou centre-ville dès 70€/nuit.",
    h1: "Location vacances à Biarritz - Comparez Airbnb, Booking & Abritel",
    introText: `Biarritz, perle de la côte basque, est une destination unique alliant élégance balnéaire, culture du surf et traditions basques. Que vous rêviez d'un appartement vue mer sur la Grande Plage, d'un logement dans le quartier historique ou d'une villa près de la Côte des Basques, AirSearch compare pour vous les meilleures offres sur toutes les plateformes.

Notre technologie de comparaison intelligente analyse en temps réel les disponibilités sur Airbnb, Booking.com et Abritel pour vous proposer le meilleur rapport qualité-prix. Filtrez par proximité de la plage, budget et équipements pour trouver votre hébergement idéal sur la côte basque.

Préparez-vous à surfer les vagues de l'Atlantique, à explorer les falaises spectaculaires et à savourer la gastronomie basque dans l'une des plus belles stations balnéaires d'Europe.`,
    whyVisit: {
      title: "Pourquoi Biarritz est la destination surf et bien-être par excellence ?",
      content: `Biarritz offre un cadre exceptionnel entre océan Atlantique et Pyrénées. Ancienne station balnéaire de l'impératrice Eugénie, la ville a su préserver son élégance Belle Époque tout en devenant la capitale européenne du surf. Ses plages spectaculaires, ses falaises et son Rocher de la Vierge offrent des panoramas à couper le souffle. Le Pays Basque environnant regorge de villages pittoresques, de traditions vivantes et d'une gastronomie reconnue mondialement. En louant un appartement, vous pourrez vivre au rythme de l'océan, explorer les marchés basques et profiter de la thalassothérapie et du bien-être.`,
    },
    popularQuarters: [
      {
        name: "Centre-ville - Grande Plage",
        description:
          "Cœur historique de Biarritz avec sa plage iconique, le casino, les boutiques de luxe et les restaurants gastronomiques.",
      },
      {
        name: "Côte des Basques",
        description:
          "Quartier prisé des surfeurs avec sa plage mythique, ambiance décontractée et vue imprenable sur la côte espagnole.",
      },
      {
        name: "Port Vieux",
        description:
          "Ancien port de pêche devenu crique intimiste, idéal pour la baignade en famille et les restaurants de fruits de mer.",
      },
      {
        name: "Saint-Charles",
        description:
          "Quartier résidentiel chic sur les hauteurs, proche des Halles et du marché couvert, ambiance locale authentique.",
      },
    ],
    attractions: [
      "Grande Plage",
      "Rocher de la Vierge",
      "Côte des Basques",
      "Aquarium de Biarritz",
      "Phare de Biarritz",
      "Port Vieux",
      "Chapelle Impériale",
      "Hôtel du Palais",
      "Cité de l'Océan",
      "Village de Saint-Jean-de-Luz",
      "Bayonne",
      "La Rhune",
    ],
    searchKeywords: [
      "location biarritz",
      "appartement biarritz",
      "airbnb biarritz",
      "logement pays basque",
      "location vacances biarritz",
      "hébergement côte basque",
    ],
    avgPrice: "70-140€",
    bestSeason: "Juin à Septembre",
    image: "/destinations/biarritz.jpg",
  },
  {
    slug: "annecy",
    name: "Annecy",
    region: "Auvergne-Rhône-Alpes",
    description:
      "Surnommée la Venise des Alpes, Annecy enchante par son lac turquoise, sa vieille ville médiévale et ses montagnes majestueuses.",
    shortDescription:
      "Découvrez Annecy, la Venise des Alpes, entre lac cristallin, vieille ville médiévale et panoramas alpins à couper le souffle.",
    metaTitle:
      "Location vacances à Annecy - Comparez Airbnb, Booking & Abritel | AirSearch",
    metaDescription:
      "Louez un appartement à Annecy au bord du lac. Comparez Airbnb, Booking et Abritel pour des logements dans la vieille ville ou vue lac dès 65€/nuit.",
    h1: "Location vacances à Annecy - Comparez Airbnb, Booking & Abritel",
    introText: `Annecy, joyau des Alpes françaises, offre un cadre naturel exceptionnel entre lac cristallin et montagnes. Que vous recherchiez un appartement dans la vieille ville historique, un logement avec vue sur le lac ou un hébergement au pied des montagnes, AirSearch compare instantanément les meilleures offres sur Airbnb, Booking.com et Abritel.

Notre comparateur intelligent vous fait gagner du temps et de l'argent en affichant toutes les options disponibles selon vos critères. Découvrez des logements de charme dans les ruelles médiévales, des appartements modernes avec vue lac ou des chalets alpins authentiques.

Préparez-vous à naviguer sur le lac le plus pur d'Europe, à explorer la vieille ville pittoresque et à randonner dans les montagnes environnantes pour des vacances entre nature et patrimoine.`,
    whyVisit: {
      title: "Pourquoi Annecy est la destination nature par excellence ?",
      content: `Annecy est régulièrement élue parmi les plus belles villes de France grâce à son cadre naturel exceptionnel. Le lac d'Annecy, réputé comme le lac le plus pur d'Europe, offre des eaux turquoise propices à la baignade, au paddle et aux croisières. La vieille ville avec ses canaux, ses arcades et le Palais de l'Île constitue un décor de conte de fées. Les montagnes environnantes (Semnoz, Tournette, Parmelan) offrent des randonnées et du parapente avec des vues spectaculaires. En louant un appartement, vous profiterez de la douceur alpine, des marchés traditionnels et des activités de plein air qui font d'Annecy une destination quatre saisons.`,
    },
    popularQuarters: [
      {
        name: "Vieille Ville",
        description:
          "Cœur historique médiéval avec ses canaux, ses ruelles colorées, le Palais de l'Île et ses restaurants au bord de l'eau.",
      },
      {
        name: "Bonlieu - Centre",
        description:
          "Quartier central moderne avec le centre culturel Bonlieu, les Jardins de l'Europe et l'accès direct au lac.",
      },
      {
        name: "Annecy-le-Vieux",
        description:
          "Commune résidentielle chic en bord de lac, port de plaisance, restaurants gastronomiques et plages paisibles.",
      },
      {
        name: "Parmelan - Novel",
        description:
          "Quartier résidentiel au pied du Parmelan, calme et verdoyant, idéal pour les amoureux de randonnée et de nature.",
      },
    ],
    attractions: [
      "Lac d'Annecy",
      "Palais de l'Île",
      "Château d'Annecy",
      "Vieille Ville",
      "Jardins de l'Europe",
      "Pont des Amours",
      "Piste cyclable du lac",
      "Col de la Forclaz",
      "Gorges du Fier",
      "Basilique de la Visitation",
      "Plage d'Albigny",
      "Semnoz",
    ],
    searchKeywords: [
      "location annecy",
      "appartement annecy",
      "airbnb annecy lac",
      "logement annecy vieille ville",
      "location vacances annecy",
      "hébergement lac annecy",
    ],
    avgPrice: "65-130€",
    bestSeason: "Juin à Septembre",
    image: "/destinations/annecy.jpg",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATIONS.map((d) => d.slug);
}
