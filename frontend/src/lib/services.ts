export async function fetchTags(data: any) {
  const tagsJSON = await fetch("http://localhost:8000/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await tagsJSON.json();
}

export async function addNoteToBD(data: any) {
  const res = await fetch("http://localhost:8000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateBdNote(data: any) {
  const res = await fetch("http://localhost:8000/api/notes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteBdNote(id: string) {
  const res = await fetch(`http://localhost:8000/api/notes/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}
