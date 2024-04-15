export async function fetchTags(data: any) {
  const tagsJSON = await fetch("https://todo-app-w1i3.vercel.app/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await tagsJSON.json();
}

export async function addNoteToBD(data: any) {
  const res = await fetch("https://todo-app-w1i3.vercel.app/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateBdNote(data: any) {
  const res = await fetch("https://todo-app-w1i3.vercel.app/api/notes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteBdNote(id: string) {
  const res = await fetch(`https://todo-app-w1i3.vercel.app/api/notes/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}
