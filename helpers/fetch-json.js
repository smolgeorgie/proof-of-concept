export default async function fetchJson(url, payload = {}) {
  return await fetch(url, pauload)
  .then((response) => response.json())
  .catch((error) => error)
}