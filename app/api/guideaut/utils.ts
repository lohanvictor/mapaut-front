export class GuideAutUtils {
  static AtividadesEstressam = "atividades_estressam";
  static AtividadesAcalmam = "atividades_acalmam";
  static Manias = "manias";
  static AspectosSoftware = "aspectos_software";
  static AspectosSociais = "aspectos_sociais";

  static getPath(section: string): string {
    const mapPath = {
      [GuideAutUtils.AtividadesEstressam]: "/atividades_estressam",
      [GuideAutUtils.AtividadesAcalmam]: "/atividades_acalmam",
      [GuideAutUtils.Manias]: "/manias",
      [GuideAutUtils.AspectosSoftware]: "/aspectos_software",
      [GuideAutUtils.AspectosSociais]: "/aspectos_sociais",
    };

    const guideAutURL = "";
    // const guideAutURL = process.env.GUIDEAUT_API || "";
    return guideAutURL + mapPath[section];
  }
}
