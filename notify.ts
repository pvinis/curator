import push from "pushsafer-notifications"

const p = new push({ k: Bun.env.PUSHSAFER_KEY })

export const notifyPavlos = async (url: string) => {
  const message = {
    t: "GOOOO!",
    m: "check for reservation now",
    u: url,
  }

  p.send(message)
}
