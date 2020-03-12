(() => {
  const photos = Application('Photos')
  photos.includeStandardAdditions = true

  const photoDataChunkSize = 10000
  const folderName = '整理'
  const importTargetAlbumName = '待整理'
  const importDataHolderAlbumName = '待整理－資料'

  Progress.totalUnitCount = 10

  function chunk(arr, n) {
    const r = Array(Math.ceil(arr.length / n)).fill()
    return r.map((e, i) => arr.slice(i * n, (i * n) + n))
  }

  Progress.description = '處理中⋯⋯'
  Progress.additionalDescription = '取得相簿⋯⋯'

  let folder
  try {
    folder = photos.folders.byName(folderName)
    folder.id()
  } catch (e) {
    photos.displayDialog(`Please create an folder named "${folderName}".`, {
      withTitle: 'Error',
      buttons: ['Ok'],
    })
    return
  }

  let importTargetAlbum
  try {
    importTargetAlbum = folder.albums.byName(importTargetAlbumName)
    importTargetAlbum.id()
  } catch (e) {
    photos.displayDialog(`Please create an album named "${importTargetAlbumName}" under ${folderName}.`, {
      withTitle: 'Error',
      buttons: ['Ok'],
    })
    return
  }

  let importDataHolderMediaItems
  try {
    importDataHolderMediaItems = folder.albums.byName(importDataHolderAlbumName).mediaItems()
  } catch (e) {
    photos.displayDialog(`Please create an album named "${importDataHolderAlbumName}" under ${folderName} and put some unused photo in it.`, {
      withTitle: 'Error',
      buttons: ['Ok'],
    })
    return
  }

  Progress.completedUnitCount = 1
  Progress.additionalDescription = '讀取已加入記錄⋯⋯'

  let importedMediaItemIDs = importDataHolderMediaItems.map((mediaItem) => {
    try {
      const array = JSON.parse(mediaItem.description())
      if (!Array.isArray(array)) throw new Error()
      return array
    } catch (e) {
      return []
    }
  }).flat()

  Progress.completedUnitCount = 3
  Progress.additionalDescription = '正在處理項目⋯⋯'

  let photosToBeImported = photos.selection()
  const photosToBeImportedCount = photosToBeImported.length

  photosToBeImported = photosToBeImported.filter((item, i) => {
    Progress.additionalDescription = `正在處理項目⋯⋯ (${i + 1}/${photosToBeImportedCount})`
    Progress.completedUnitCount = 3 + (2 * (i / photosToBeImportedCount))
    const id = item.id()
    const toAdd = !importedMediaItemIDs.includes(id)
    if (toAdd) importedMediaItemIDs.push(id)
    return toAdd
  })

  Progress.completedUnitCount = 5
  Progress.additionalDescription = '正在處理資訊⋯⋯'

  importedMediaItemIDs = [...new Set(importedMediaItemIDs)]
  const chunkedImportedMediaItemIDs = chunk(importedMediaItemIDs, photoDataChunkSize)

  if (chunkedImportedMediaItemIDs.length > importDataHolderMediaItems.length) {
    photos.displayDialog(`Please add more unused photos to "${importDataHolderAlbumName}".`, {
      withTitle: 'Error',
      buttons: ['Ok'],
    })
    return
  }

  Progress.completedUnitCount = 6
  Progress.additionalDescription = '正在加入項目⋯⋯'

  photos.add(photosToBeImported, { to: importTargetAlbum })

  Progress.completedUnitCount = 8
  Progress.additionalDescription = '正在寫入資訊⋯⋯'

  for (let i = 0; i < chunkedImportedMediaItemIDs.length; ++i) {
    importDataHolderMediaItems[i].description = JSON.stringify(chunkedImportedMediaItemIDs[i])
  }

  Progress.completedUnitCount = 10
  photos.displayDialog(`已將 ${photosToBeImported.length} 個項目加入「${importTargetAlbumName}」，目前共有 ${importedMediaItemIDs.length} 個項目曾被加入「${importTargetAlbumName}」。`, {
    withTitle: '完成',
    buttons: ['Ok'],
  })
})()
