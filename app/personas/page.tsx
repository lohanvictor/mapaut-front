"use client";

import { useState } from "react";
import { LIST_PERSONAS_MOCK } from "../_mocks/persona.mock";
import { Button, IconButton, Pagination, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import PersonaListItem from "../_components/PersonaIListItem";
import { useRouter } from "next/navigation";

export default function PersonasList() {
  const [personaList, setPersonaList] = useState(LIST_PERSONAS_MOCK);

  const router = useRouter();

  function handleClickPersona(id: string) {
    router.push(`/personas/view/${id}`);
  }

  function handlePagination(newPage: number) {
    console.log(newPage);
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-4 p-6 overflow-y-auto">
      <div className="w-full flex flex-row justify-between">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-4xl text-slate-950">Personas</span>
          <span className="text-slate-950">
            Total: {personaList.totalItems}
          </span>
        </div>

        <div className="flex flex-col gap-4 items-end">
          <div className="w-72 flex flex-row gap-2">
            <TextField
              id="persona-search-input"
              label="Busque sua persona"
              variant="standard"
              fullWidth
            />
            <IconButton>
              <Search />
            </IconButton>
          </div>
          <Button variant="contained">Nova Persona</Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 overflow-y-auto h-full">
        {personaList.items.map((persona) => (
          <PersonaListItem
            key={persona.id}
            persona={persona}
            onClick={() => handleClickPersona(persona.id)}
          />
        ))}
      </div>

      <Pagination
        count={personaList.pagination.pages}
        page={personaList.pagination.page}
        onChange={(_, page) => handlePagination(page)}
        color="primary"
      />
    </div>
  );
}
