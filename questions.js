// MindSer - Questionnaire Data (QDPE)

const dimensions = [
    {
        id: 1,
        title: "Mentalidade Executiva",
        description: "Avalia se a pessoa já pensa como diretora, mesmo sem o cargo.",
        interpretation: {
            low: "Mentalidade ainda gerencial - foco em execução e controle operacional. A pessoa tende a se concentrar em tarefas do dia a dia e pode ter dificuldade em delegar ou pensar estrategicamente.",
            high: "Base executiva instalada - pensamento estratégico e visão ampla. A pessoa demonstra capacidade de ver o negócio como um todo e tomar decisões considerando múltiplas perspectivas."
        },
        detailedHigh: "Excelente! A pessoa demonstra clara mentalidade executiva, pensando além de sua área direta e focando em impacto no negócio. Está pronta para assumir responsabilidades de nível diretoria.",
        detailedMedium: "A mentalidade executiva está em desenvolvimento. A pessoa alterna entre pensamento operacional e estratégico. Recomenda-se trabalhar a delegação e a visão de longo prazo.",
        detailedLow: "A mentalidade ainda é predominantemente gerencial. A pessoa foca muito em execução e controle. É necessário desenvolver a capacidade de pensar estrategicamente e abrir mão do controle operacional.",
        threshold: 3,
        questions: [
            "Tomo decisões considerando impactos além da minha área direta.",
            "Consigo abrir mão de controle operacional sem comprometer resultados.",
            "Penso em cenários de médio e longo prazo, não apenas em entregas imediatas.",
            "Me sinto confortável decidindo com informações incompletas.",
            "Meu foco principal é impacto no negócio, não execução perfeita."
        ]
    },
    {
        id: 2,
        title: "Tomada de Decisão e Responsabilidade",
        description: "Avalia autonomia, coragem decisória e accountability.",
        interpretation: {
            low: "Indica evitação e dependência - dificuldade em assumir riscos. A pessoa pode postergar decisões ou buscar validação excessiva antes de agir.",
            high: "Prontidão para exposição executiva - autonomia e coragem decisória. A pessoa assume responsabilidade por suas decisões e não teme a exposição que vem com elas."
        },
        detailedHigh: "Excelente capacidade decisória! A pessoa demonstra coragem para tomar decisões difíceis, assume riscos calculados e é referência em momentos críticos. Está pronta para a exposição executiva.",
        detailedMedium: "Capacidade decisória em desenvolvimento. A pessoa toma decisões, mas pode hesitar em situações de maior risco ou pressão. Recomenda-se praticar a tomada de decisão em cenários mais desafiadores.",
        detailedLow: "Há sinais de evitação decisória. A pessoa pode postergar decisões importantes ou buscar validação excessiva. É fundamental desenvolver a coragem para decidir mesmo com incertezas.",
        threshold: 3,
        questions: [
            "Sustento decisões difíceis mesmo sob pressão.",
            "Assumo riscos calculados quando necessário.",
            "Prefiro decidir a postergar esperando mais dados.",
            "Lido bem com erros decorrentes de decisões estratégicas.",
            "Sou referência quando decisões críticas precisam ser tomadas."
        ]
    },
    {
        id: 3,
        title: "Influência e Política Organizacional",
        description: "Avalia capacidade de jogar o jogo organizacional conscientemente.",
        interpretation: {
            low: "Um dos maiores bloqueios à diretoria - baixa articulação política. A pessoa pode não entender ou não participar ativamente das dinâmicas de poder na organização.",
            high: "Habilidade política desenvolvida - capacidade de influenciar e articular. A pessoa entende as dinâmicas organizacionais e sabe navegar estrategicamente."
        },
        detailedHigh: "Forte habilidade política! A pessoa entende claramente as dinâmicas de poder, tem patrocinadores, e sabe influenciar sem depender de autoridade formal. Está bem posicionada para ascensão.",
        detailedMedium: "Habilidade política em desenvolvimento. A pessoa entende parcialmente as dinâmicas organizacionais, mas pode não estar cultivando ativamente sua rede de influência. Recomenda-se investir em relacionamentos estratégicos.",
        detailedLow: "ATENÇÃO: Esta é frequentemente a maior barreira para a diretoria. A pessoa pode estar focada apenas em resultados técnicos, ignorando a importância da articulação política. É urgente desenvolver esta competência.",
        threshold: 3,
        questions: [
            "Entendo claramente quem influencia decisões estratégicas na empresa.",
            "Tenho patrocinadores que defendem meu crescimento.",
            "Consigo influenciar sem depender de autoridade formal.",
            "Sei adaptar minha comunicação a diferentes públicos decisores.",
            "Consigo sustentar discordâncias de forma estratégica."
        ]
    },
    {
        id: 4,
        title: "Comunicação Executiva e Posicionamento",
        description: "Avalia presença, narrativa e clareza.",
        interpretation: {
            low: "Comunicação ainda operacional - foco em detalhes, não em visão. A pessoa pode se perder em explicações técnicas e não conseguir transmitir uma visão clara.",
            high: "Comunicação executiva - clareza, síntese e posicionamento estratégico. A pessoa consegue comunicar de forma impactante e é vista como alguém que traz visão."
        },
        detailedHigh: "Comunicação executiva exemplar! A pessoa consegue sintetizar temas complexos, transmitir visão clara e ocupar espaço em fóruns de alta liderança com segurança. Sua fala gera direcionamento.",
        detailedMedium: "Comunicação em transição. A pessoa consegue se comunicar bem, mas pode oscilar entre o operacional e o estratégico. Recomenda-se praticar síntese e posicionamento em apresentações executivas.",
        detailedLow: "A comunicação ainda é muito operacional. A pessoa pode trazer mais problemas do que soluções, ou se perder em detalhes técnicos. É necessário desenvolver a capacidade de síntese e visão estratégica na comunicação.",
        threshold: 3,
        questions: [
            "Comunico ideias de forma objetiva e estratégica.",
            "Sei sintetizar temas complexos para alta liderança.",
            "Sou percebida como alguém que traz visão, não só problemas.",
            "Minha fala gera direcionamento, não confusão.",
            "Consigo ocupar espaço em fóruns executivos com segurança."
        ]
    },
    {
        id: 5,
        title: "Maturidade Emocional Executiva",
        description: "Avalia sustentação do custo do cargo.",
        interpretation: {
            low: "Dificuldade em sustentar pressão e exposição do cargo executivo. A pessoa pode levar críticas para o lado pessoal ou ter dificuldade com decisões impopulares.",
            high: "Maturidade para lidar com conflitos, pressão e decisões impopulares. A pessoa consegue separar o profissional do pessoal e sustentar posições mesmo sob pressão."
        },
        detailedHigh: "Alta maturidade emocional! A pessoa lida bem com conflitos, separa discordância profissional de pessoal, e consegue tomar decisões impopulares quando necessário. Está preparada para o 'custo' emocional do cargo executivo.",
        detailedMedium: "Maturidade emocional em desenvolvimento. A pessoa lida razoavelmente com pressão, mas pode ter dificuldades em situações de maior tensão política ou decisões muito impopulares. Recomenda-se trabalhar a resiliência emocional.",
        detailedLow: "A maturidade emocional precisa ser desenvolvida. A pessoa pode ter dificuldade em sustentar a pressão constante, a exposição e as cobranças que vêm com um cargo executivo. É importante trabalhar a separação entre o pessoal e o profissional.",
        threshold: 3,
        questions: [
            "Lido bem com conflitos diretos e tensões políticas.",
            "Consigo separar discordância profissional de pessoal.",
            "Não preciso ser aprovada para sustentar decisões.",
            "Tolero exposição e cobrança constantes.",
            "Consigo tomar decisões impopulares quando necessário."
        ]
    },
    {
        id: 6,
        title: "Estratégia de Carreira e Timing",
        description: "Avalia realismo e clareza de caminho.",
        interpretation: {
            low: "Expectativa desalinhada de tempo - falta clareza sobre o caminho. A pessoa pode não ter um plano concreto ou ter expectativas irrealistas sobre o timing da promoção.",
            high: "Visão clara e realista do caminho para posição executiva. A pessoa sabe exatamente o que precisa construir e tem planos alternativos."
        },
        detailedHigh: "Estratégia de carreira bem definida! A pessoa tem clareza sobre os critérios reais para promoção, expectativas realistas de tempo, e planos alternativos caso a promoção não aconteça internamente.",
        detailedMedium: "Estratégia de carreira parcialmente definida. A pessoa tem alguma clareza sobre o caminho, mas pode não ter um plano B ou expectativas totalmente realistas. Recomenda-se mapear critérios concretos e prazos.",
        detailedLow: "ATENÇÃO: Falta clareza estratégica sobre a carreira. A pessoa pode ter expectativas desalinhadas de tempo ou não saber exatamente o que precisa construir. É fundamental definir um plano concreto com critérios e prazos realistas.",
        threshold: 3,
        questions: [
            "Tenho clareza sobre os critérios reais para virar diretora.",
            "Meu objetivo de tempo para promoção é realista.",
            "Tenho um plano caso essa promoção não aconteça internamente.",
            "Estou disposta a mudar de empresa se necessário.",
            "Sei exatamente o que preciso construir nos próximos 12–24 meses."
        ]
    }
];

const scoreInterpretation = {
    high: {
        min: 120,
        label: "Pronta para aceleração executiva",
        description: "A pessoa demonstra alta prontidão para assumir posições executivas. As bases comportamentais e estratégicas estão bem estabelecidas. Recomenda-se um programa de aceleração focado em exposição, networking estratégico e preparação para processos seletivos de diretoria.",
        color: "#27AE60"
    },
    medium: {
        min: 90,
        label: "Em construção",
        description: "A pessoa está em processo de desenvolvimento executivo. Há fundamentos sólidos, mas algumas dimensões precisam de fortalecimento. Uma mentoria estruturante pode acelerar significativamente a preparação, focando nas áreas de menor pontuação.",
        color: "#D4AF37"
    },
    low: {
        min: 0,
        label: "Base ainda gerencial",
        description: "A mentalidade ainda está mais voltada para gestão operacional do que para liderança executiva. Uma mentoria de maturação é recomendada para desenvolver as competências executivas fundamentais antes de buscar posições de diretoria. O foco deve ser em ampliar a visão estratégica e desenvolver habilidades políticas.",
        color: "#E74C3C"
    }
};

const qualitativeAnalysis = [
    {
        condition: (scores) => scores[0] >= 4 && scores[2] <= 3,
        insight: "Discrepância entre mentalidade alta e política baixa",
        risk: "Risco clássico: a pessoa pensa como executiva, mas pode não estar articulando adequadamente sua ascensão. Há pensamento estratégico, mas falta habilidade política para navegar a organização.",
        recommendation: "Investir urgentemente em construção de rede de patrocinadores e desenvolvimento de habilidades de influência. Mapear stakeholders-chave e criar estratégia de relacionamento."
    },
    {
        condition: (scores) => scores[3] >= 4 && scores[1] <= 3,
        insight: "Comunicação alta + decisão baixa",
        risk: "A pessoa tem boa influência e presença, mas pode estar evitando decisões difíceis que demonstrem coragem executiva. Pode ser vista como alguém que fala bem, mas não entrega resultados difíceis.",
        recommendation: "Buscar oportunidades para tomar decisões de maior risco e visibilidade. Praticar a exposição decisória em situações controladas antes de assumir desafios maiores."
    },
    {
        condition: (scores) => scores[5] <= 3,
        insight: "Estratégia de carreira baixa",
        risk: "Expectativa possivelmente desalinhada de tempo. A pessoa pode não ter clareza sobre os critérios reais para promoção ou estar esperando que a promoção 'aconteça naturalmente'.",
        recommendation: "Definir um plano de carreira concreto com critérios mensuráveis e prazos realistas. Conversar com RH e liderança sobre os requisitos reais para a posição desejada."
    },
    {
        condition: (scores) => scores[4] <= 3 && scores[0] >= 4,
        insight: "Mentalidade executiva sem maturidade emocional correspondente",
        risk: "A pessoa pode ter dificuldade em sustentar a pressão e exposição que vêm com o cargo. Pensa como executiva, mas pode não aguentar o 'custo emocional' da posição.",
        recommendation: "Trabalhar resiliência emocional e capacidade de lidar com conflitos. Considerar coaching focado em inteligência emocional e gestão de estresse executivo."
    },
    {
        condition: (scores) => scores[0] <= 3 && scores[1] <= 3 && scores[2] <= 3,
        insight: "Múltiplas dimensões críticas abaixo do esperado",
        risk: "Há um gap significativo entre a posição atual e a prontidão executiva. A pessoa precisa de desenvolvimento estruturado em várias frentes antes de buscar uma posição de diretoria.",
        recommendation: "Recomenda-se uma mentoria de maturação de médio prazo (12-18 meses) focada em desenvolver mentalidade executiva, coragem decisória e habilidades políticas de forma integrada."
    }
];
