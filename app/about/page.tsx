"use client";

export default function AboutPage() {
  function openProAut() {
    window.open(
      "https://drive.google.com/file/d/1_12ir0AUYYq2PuD_dNA_eKovMyqBp0ef/view?usp=sharing"
    );
  }
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6">
      <h1 className="font-sans text-4xl text-slate-950">Sobre o MapAut</h1>
      <p className="font-sans text-justify text-slate-950">
        O MapAut é um software criado para facilitar a geração de personas
        autistas, inspirado no modelo PersonAut, um dos artefatos do processo
        ProAut. O ProAut é uma metodologia voltada para o design de interfaces
        acessíveis, especialmente para pessoas com Transtorno do Espectro
        Autista (TEA). Embora o ProAut ofereça um conjunto completo de etapas e
        técnicas para a criação de interfaces inclusivas, o MapAut se concentra
        em uma dessas ferramentas: a criação de personas autistas. Dessa forma,
        ele permite que desenvolvedores e designers gerem personas
        personalizadas com agilidade, sem necessariamente precisar seguir todas
        as etapas do ProAut.
      </p>

      <strong className="font-sans text-slate-950">
        O que é o ProAut e como ele ajuda no desenvolvimento de interfaces
        acessíveis?
      </strong>

      <p className="font-sans text-justify text-slate-950">
        O ProAut estrutura um conjunto de técnicas e práticas para o design de
        interfaces voltadas para pessoas com TEA. Ele inclui desde pesquisa desk
        e entrevistas para levantamento de requisitos específicos até abordagens
        como o PersonAut, que apoia a criação de personas autistas detalhadas, e
        o EmpathyAut, uma técnica para fomentar empatia com o público autista.
        Além disso, o ProAut fornece cenários e requisitos fundamentais que
        auxiliam na construção de interfaces mais inclusivas e acessíveis. O uso
        dessas técnicas permite que profissionais de design e desenvolvimento
        identifiquem e mitiguem desafios enfrentados por usuários autistas.
      </p>

      <strong className="font-sans text-slate-950">
        O que o MapAut oferece?
      </strong>

      <p className="font-sans text-justify text-slate-950">
        O MapAut oferece uma interface intuitiva que guia o usuário no
        preenchimento dos dados para criar personas autistas detalhadas, com as
        seguintes funcionalidades:
        <ul className="list-disc pl-6">
          <li>
            <strong>Criação de Personas Autistas: </strong> Siga um passo a
            passo baseado no modelo PersonAut para gerar personas detalhadas,
            que representam as características, necessidades e preferências de
            usuários com TEA.
          </li>
          <li>
            <strong>Personalização de Personas: </strong> Customize as
            informações de cada persona para atender às necessidades do seu
            projeto.
          </li>
          <li>
            <strong>Exportação em PDF: </strong> Exporte as personas geradas em
            um arquivo PDF, permitindo fácil consulta e compartilhamento.
          </li>
          <li>
            <strong>Sistema de Login e Gerenciamento de Personas: </strong>
            Salve e gerencie suas personas com segurança, mantendo todas as
            informações centralizadas para facilitar o acesso.
          </li>
        </ul>
      </p>

      <strong className="font-sans text-slate-950">
        Para quem é o MapAut?
      </strong>

      <p className="font-sans text-justify text-slate-950">
        O MapAut é ideal para profissionais de design e desenvolvimento que
        desejam criar personas autistas com base no PersonAut, seja como parte
        de um processo completo do ProAut ou como uma ferramenta independente de
        geração de personas. Assim, ele atende a desenvolvedores e designers que
        buscam adaptar suas interfaces às necessidades de pessoas com TEA de
        forma prática e acessível.
      </p>

      <strong className="font-sans text-slate-950">Referências</strong>

      <a className="text-guidaut-blue underline" href="#" onClick={openProAut}>
        Trabalho de doutorado da Prof. Dra. Áurea Melo
      </a>
    </div>
  );
}
