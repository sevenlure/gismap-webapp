import React from 'react'
import PropTypes from 'prop-types'
import { Popup, withLeaflet } from 'react-leaflet'

import PoupContent from './popupContent'

const MapPopup = ({ title, markerTypeKey, properties }) => {
  return (
    <Popup>
      <PoupContent title={title} markerTypeKey={markerTypeKey} properties={properties} />
    </Popup>
  )
}

MapPopup.propTypes = {
  title: PropTypes.string,
  markerTypeKey: PropTypes.string,
  properties: PropTypes.object
}
export default MapPopup
