import {
  Pagination,
  PersonaModel,
  PersonaModelList,
} from "@/app/@types/persona.type";
import { firebaseDb } from "../_lib/firebase";
import { PAGES_PER_PAGE } from "./route";

function mapDocToPersonaModel(doc: any): PersonaModel {
  const docData = doc.data();
  return {
    aspectos_sociais: docData.aspectos_sociais,
    aspectos_software: docData.aspectos_software,
    atividades_acalmam: docData.atividades_acalmam,
    atividades_estressam: docData.atividades_estressam,
    cognicao: docData.cognicao,
    comportamento: docData.comportamento,
    comunicacao: docData.comunicacao,
    genero: docData.genero,
    idade: docData.idade,
    id: doc.id,
    interacao: docData.interacao,
    linguagem: docData.linguagem,
    manias: docData.manias,
    modelo: docData.modelo,
    nivel_autismo: docData.nivel_autismo,
    nome: docData.nome,
    sensibilidade_som: docData.sensibilidade_som,
    sobre: docData.sobre,
    foto: docData.foto,
  };
}

export class PersonaService {
  static async getAllBy(page: number, name: string): Promise<PersonaModelList> {
    let q = firebaseDb.collection("personas");
    let response: FirebaseFirestore.QuerySnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >;
    if (name) {
      response = await q.where("nome", "==", name).get();
    } else {
      response = await q.get();
    }

    return {
      totalItems: response.size,
      pagination: {
        page: page,
        pages: Math.ceil(response.size / PAGES_PER_PAGE),
      },
      items: response.docs
        .slice(page - 1 * PAGES_PER_PAGE, page * PAGES_PER_PAGE)
        .map(mapDocToPersonaModel),
    };
  }

  static async getById(id: string): Promise<PersonaModel | null> {
    const response = await firebaseDb.collection("personas").doc(id).get();
    if (response.exists) return mapDocToPersonaModel(response);

    return null;
  }

  static async save(persona: PersonaModel): Promise<{ id: string }> {
    const ref = firebaseDb.collection("personas").doc();
    persona.id = ref.id;
    await ref.set(persona);
    return { id: ref.id };
  }

  static async update(persona: PersonaModel): Promise<void> {
    const ref = firebaseDb.collection("personas").doc(persona.id);
    await ref.set(persona, { merge: true });
  }

  static async delete(id: string): Promise<void> {
    await firebaseDb.collection("personas").doc(id).delete();
  }
}