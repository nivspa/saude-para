import { Language } from './types';

// Interface para uma tradução de campanha
interface CampaignTranslation {
  title: string;
  desc: string;
}

// Interface para o mapa de traduções
type CampaignTranslations = {
  [K in Language]: {
    [key: string]: CampaignTranslation;
  };
};

export const campaignTranslations: CampaignTranslations = {
  "pt-BR": {
    "dezembro-vermelho": {
      title: "Campanha Dezembro Vermelho 2024",
      desc: "Conscientização e combate ao HIV/AIDS em todo o Pará"
    },
    "novembro-azul": {
      title: "Campanha Novembro Azul 2024",
      desc: "Conscientização sobre a saúde do homem e prevenção ao câncer de próstata"
    },
    "setembro-verde": {
      title: "Setembro Verde",
      desc: "Conscientização sobre a doação de órgãos no Pará"
    },
    "malaria-zero": {
      title: "Malária Zero",
      desc: "Campanha de prevenção à malária na região amazônica"
    },
    "amamentacao": {
      title: "Amamentação",
      desc: "Incentivo ao aleitamento materno nas comunidades paraenses"
    }
  },
  "en": {
    "dezembro-vermelho": {
      title: "Red December Campaign 2024",
      desc: "HIV/AIDS awareness and prevention in Pará"
    },
    "novembro-azul": {
      title: "Blue November Campaign 2024",
      desc: "Men's health awareness and prostate cancer prevention"
    },
    "setembro-verde": {
      title: "Green September",
      desc: "Organ donation awareness in Pará"
    },
    "malaria-zero": {
      title: "Malaria Zero",
      desc: "Malaria prevention campaign in the Amazon region"
    },
    "amamentacao": {
      title: "Breastfeeding",
      desc: "Promoting breastfeeding in Pará communities"
    }
  },
  "es": {
    "dezembro-vermelho": {
      title: "Campaña Diciembre Rojo 2024",
      desc: "Concientización y prevención del VIH/SIDA en Pará"
    },
    "novembro-azul": {
      title: "Campaña Noviembre Azul 2024",
      desc: "Concientización sobre la salud masculina y prevención del cáncer de próstata"
    },
    "setembro-verde": {
      title: "Septiembre Verde",
      desc: "Concientización sobre la donación de órganos en Pará"
    },
    "malaria-zero": {
      title: "Malaria Cero",
      desc: "Campaña de prevención de la malaria en la región amazónica"
    },
    "amamentacao": {
      title: "Lactancia Materna",
      desc: "Promoción de la lactancia materna en las comunidades de Pará"
    }
  },
  "zh": {
    "dezembro-vermelho": {
      title: "红色十二月活动 2024",
      desc: "帕拉州艾滋病预防和意识提升"
    },
    "novembro-azul": {
      title: "蓝色十一月活动 2024",
      desc: "男性健康意识和前列腺癌预防"
    },
    "setembro-verde": {
      title: "绿色九月",
      desc: "帕拉州器官捐献意识"
    },
    "malaria-zero": {
      title: "疟疾零计划",
      desc: "亚马逊地区疟疾预防活动"
    },
    "amamentacao": {
      title: "母乳喂养",
      desc: "促进帕拉州社区母乳喂养"
    }
  },
  "fr": {
  "dezembro-vermelho": {
    title: "Campagne Décembre Rouge 2024",
    desc: "Sensibilisation et prévention du VIH/SIDA au Pará"
  },
  "novembro-azul": {
    title: "Campagne Novembre Bleu 2024",
    desc: "Sensibilisation à la santé masculine et prévention du cancer de la prostate"
  },
  "setembro-verde": {
    title: "Septembre Vert",
    desc: "Sensibilisation au don d'organes au Pará"
  },
  "malaria-zero": {
    title: "Paludisme Zéro",
    desc: "Campagne de prévention du paludisme dans la région amazonienne"
  },
  "amamentacao": {
    title: "Allaitement Maternel",
    desc: "Promotion de l'allaitement maternel dans les communautés du Pará"
  }
}
};