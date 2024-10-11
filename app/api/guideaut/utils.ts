export class GuideAutUtils {
  static AtividadesEstressam = "atividades_estressam";
  static AtividadesAcalmam = "atividades_acalmam";
  static Manias = "manias";
  static AspectosSoftware = "aspectos_software";
  static AspectosSociais = "aspectos_sociais";

  static getPath(section: string): string {
    const mapPath = {
      [GuideAutUtils.AtividadesEstressam]: "/atividades-estressam",
      [GuideAutUtils.AtividadesAcalmam]: "/atividades-acalmam",
      [GuideAutUtils.Manias]: "/manias",
      [GuideAutUtils.AspectosSoftware]: "/aspectos-software",
      [GuideAutUtils.AspectosSociais]: "/aspectos-sociais",
    };

    const guideAutURL = process.env.GUIDEAUT_API || "";
    return guideAutURL + mapPath;
  }
}
