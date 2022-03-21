import React from 'react'

const PORTAL_PREFIX = 'portal_'

let portalNextKey = 0

export const Portal: {
  add: (element: React.ReactElement) => string
  remove: (portalKey: string) => void
  Host: React.FC
} = {
  add: null as any,
  remove: null as any,
  Host: () => null,
}

const PortalHost: React.FC = () => {
  const [portals, setPortals] = React.useState<
    {
      key: string
      children: React.ReactElement
    }[]
  >([])

  Portal.add = (element: React.ReactElement) => {
    portalNextKey += 1

    const key = `${PORTAL_PREFIX}${portalNextKey}`

    setPortals([
      ...portals,
      {
        key,
        children: element,
      },
    ])

    return key
  }

  Portal.remove = (portalKey: string) => {
    setPortals(portals.filter(portal => portal.key !== portalKey))
  }

  return (
    <>
      {portals.map(portal => (
        <React.Fragment key={portal.key}>{portal.children}</React.Fragment>
      ))}
    </>
  )
}

Portal.Host = PortalHost
