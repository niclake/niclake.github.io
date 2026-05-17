import keyboards from './keyboards.json' with { 'type': 'json' }

export default async function () {
  const allKeyboards = keyboards
  const builtKeyboards = allKeyboards.filter((keyboard) => keyboard.status === "Received")
  const unbuiltKeyboards = allKeyboards.filter((keyboard) => keyboard.status === "Not Built")
  const wishlistKeyboards = allKeyboards.filter((keyboard) => keyboard.status === "Wishlist")

  return {
    allKeyboards: allKeyboards,
    builtKeyboards: builtKeyboards,
    unbuiltKeyboards: unbuiltKeyboards,
    wishlistKeyboards: wishlistKeyboards
  }
}