/* Script Body */

function main() {
  Progress.description = 'Preparing...'

  const omniFocus = Application('OmniFocus')
  omniFocus.includeStandardAdditions = true

  Progress.additionalDescription = 'Loading Google API Key...'

  try {
    Progress.additionalDescription = 'Loading tags data...'

    const theRootPlacesTag = omniFocus.defaultDocument().tags().find(t => t.name() === 'Places')

    if (!theRootPlacesTag) {
      throw new Error('Cannot find a tag named "Places"')
    }

    const placeTags = getPlaceTagsUnder(theRootPlacesTag)
    Progress.totalUnitCount = placeTags.length + 1

    for (const placeTag of placeTags) {
      Progress.description = `Searching places for "${placeTag.name()}" ...`
      let additionalDescription = placeTag.note() && placeTag.note().split('\n').filter(l => l.match(placeSearchConditionRegex)).join(' + ')
      if (additionalDescription.length > 80) {
        additionalDescription = additionalDescription.substring(0, 80) + '...'
      }
      Progress.additionalDescription = additionalDescription

      let places = getPlaceSearchConditionsFromPlaceTag(placeTag).map(c => getPlaces(c)).flat()

      places = places.reduce((obj, place) => {
        obj[place.id] = place
        return obj
      }, {})
      places = Object.values(places)

      const notesFromTagsUnderPlaceTag = placeTag.tags().map(t => t.note())
      const newPlaces = places.filter(place => !notesFromTagsUnderPlaceTag.find(n => n.match(`place_id: ${place.id}`)))

      Progress.description = `Updating "${placeTag.name()}" ...`

      const newPlacesCount = newPlaces.length
      for (const [i, place] of newPlaces.entries()) {
        Progress.additionalDescription = `Adding "${place.name}" (${i + 1}/${newPlacesCount})...`
        placeTag.tags.push(omniFocus.Tag({
          name: place.name,
          note: `place_id: ${place.id}`,
          // Setting the location on Mac is not supported, have to do it manually (copy and paste the address) on iOS
          name: `${place.name}%${place.location.name}`,
          // location: omniFocus.LocationInformation({
          //   trigger: 'notify when arriving',
          //   latitude: place.location.latitude,
          //   longitude: place.location.longitude,
          //   name: place.location.name,
          //   radius: 10,
          // }),
        }))
      }

      Progress.completedUnitCount += 1
      Progress.description = ''
      Progress.additionalDescription = ''
    }
  } catch (e) {
    omniFocus.displayDialog(e.message, {
      withTitle: 'Error',
      buttons: ['Ok'],
    })
  }
}

/* Helper Functions */

let currentApplication
function getCurrentApplication() {
  if (currentApplication) {
    return currentApplication
  }

  currentApplication = Application.currentApplication()
  currentApplication.includeStandardAdditions = true

  return currentApplication
}

let googleAPIKey
function getGoogleAPIKey() {
  if (googleAPIKey) {
    return googleAPIKey
  }

  try {
    googleAPIKey = getCurrentApplication().doShellScript("security find-generic-password -s 'Google API Key' -w")
  } catch (e) {}

  if (!googleAPIKey) {
    throw new Error('Cannot get "Google API Key" from your Login Keychain.\n\nPlease add a generic password with its service named "Google API Key" and the API key as password in your login keychain.\n\nOr make sure the command "security find-generic-password -s \'Google API Key\' -w" works.')
  }

  return googleAPIKey
}

const placeSearchConditionRegex = /(.+),.*\(([0-9.]+), ?([0-9.]+)\)$/m // "無印良品, 台北 (25.0411876, 121.5428754)"

function getPlaceTagsUnder(tag) {
  if (tag.name().match(placeSearchConditionRegex) || tag.note().match(placeSearchConditionRegex)) {
    return [tag]
  }

  return tag.tags().map(t => getPlaceTagsUnder(t)).flat()
}

function getPlaces({ keyword, latitude, longitude }) {
  const responseText = getCurrentApplication().doShellScript(`curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${getGoogleAPIKey()}&keyword=${keyword}&location=${latitude},${longitude}&radius=5000&language=zh-TW"`)

  const responseJSON = JSON.parse(responseText)
  const places = responseJSON.results.map(r => ({
    id: r.place_id,
    name: r.name,
    location: {
      latitude: r.geometry.location.lat,
      longitude: r.geometry.location.lng,
      name: r.vicinity,
    },
  }))

  return places
}

function getPlaceSearchConditionsFromPlaceTag(tag) {
  let matchs = [tag.name().match(placeSearchConditionRegex)]
  matchs = [...matchs, ...tag.note().split('\n').map(line => line.match(placeSearchConditionRegex))]
  matchs = matchs.filter(m => !!m)

  const searchConditions = matchs.map(([_, keyword, latitude, longitude]) => ({ keyword, latitude, longitude }))

  return searchConditions
}

main()
