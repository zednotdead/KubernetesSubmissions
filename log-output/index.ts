import { randomUUIDv7 } from "bun"

const getHashNow = () => {
  const randomHash = randomUUIDv7()

  console.log(randomHash)

  setTimeout(getHashNow, 5000)
}

getHashNow()
