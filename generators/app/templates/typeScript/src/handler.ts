import "source-map-support/register"

export const handle = async (
  evt: Record<string, unknown>
): Promise<{
  statusCode: number
  body: string
}> => {
  console.log("Event received", evt)
  return { statusCode: 200, body: JSON.stringify(evt) }
}
