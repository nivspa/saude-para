// types.ts
export type Language = "pt-BR" | "en" | "es" | "zh" | "fr";

// Para as campanhas
export interface CampaignTranslation {
 title: string;
 desc: string;
}

export type CampaignTranslations = Record<Language, Record<string, CampaignTranslation>>;

// Para as traduções gerais
export type TranslationRecord = {
 // Cabeçalho
 "search.placeholder": string;
 
 // Menu Grid
 "menu.locations": string;
 "menu.campaigns": string;
 "menu.materials": string;
 "menu.whatsapp": string;
 
 // Seção de Pontos
 "section.locate": string;
 "points.vaccination": string;
 "points.vaccination.desc": string;
 "points.food": string;
 "points.food.desc": string;
 "points.parks": string;
 "points.parks.desc": string;
 "points.cultural": string;
 "points.cultural.desc": string;
 "points.health": string;
 "points.health.desc": string;
 "points.hospitals": string;
 "points.hospitals.desc": string;
 
 // Navegação
 "nav.home": string;
 "nav.map": string;
 "nav.campaigns": string;
 "nav.profile": string;
 
 // Menu Lateral
 "menu.notification": string;
 "menu.dashboard": string;
 "menu.educational": string;
 "menu.apps": string;
 "menu.security": string;
 "menu.version": string;
 "menu.bug": string;
 "menu.logout": string;
 
 // Seletor de Idiomas
 "language.select": string;

 // Departamentos
 "department.title": string;
 "department.health-surveillance": string;
 "department.accidents": string;
 "department.chronic": string;
 "department.mental-health": string;
 "department.infectious": string;
 "department.zoonoses": string;
 "department.medications": string;
 "department.maternal": string;
 "department.epidemiology": string;
}

// Tipo para o objeto de traduções completo
export type TranslationsType = Record<Language, TranslationRecord>;