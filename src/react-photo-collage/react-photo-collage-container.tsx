import React, { useEffect, useRef, useState, useCallback } from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";

import { 
    ReactPhotoCollageComponent,
} from './react-photo-collage-component';

const createPhotoIds = (photos) => {
    return photos.map((data, i) => { 
        return {...data, id: i} 
    });
}
const createLayoutPhotoMaps = (layout, photos) => {
    const newPhotos = createPhotoIds(photos);
    const newMaps = {};
    layout.reduce((accumulator, currentValue, currentIndex) => {
        newMaps[currentIndex] = newPhotos.slice(accumulator, accumulator + currentValue);
        return accumulator + currentValue;
    }, 0);

    return newMaps;

}

interface ReactPhotoCollageContainerProps {
    layout: Array<number>;
    width: string;
    margin: string;
    photos: Array<{src: string}>;
    photosHeight: Array<string>;
}
const ReactPhotoCollageContainer: React.FC<ReactPhotoCollageContainerProps> = (props) => {
    const { layout, photos } = props;
    const layoutNum = layout.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const remainingNum = photos.length - layoutNum;
    const [ allowRender, setAllowRender ] = useState<boolean>(false);
    const [ layoutPhotoMaps, setLayoutPhotoMaps ] = useState<any>({});
    const [ viewerIsOpen, setViewerIsOpen ] = useState<boolean>(false);
    const [ currentImage, setCurrentImage ] = useState<number>(0);
    
    useEffect(() => {
        setLayoutPhotoMaps(createLayoutPhotoMaps(layout, photos));
    }, []);
    useEffect(() => {
        Object.keys(layoutPhotoMaps).length ? setAllowRender(true) : setAllowRender(false);
    }, [layoutPhotoMaps]);

    const openLightbox = (id) => {
        setCurrentImage(parseInt(id));
        setViewerIsOpen(true);
    }
    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }

    if (allowRender) {
        return (
            <React.Fragment>
                <ReactPhotoCollageComponent 
                    layout={layout}
                    layoutPhotoMaps={layoutPhotoMaps}
                    layoutNum={layoutNum}
                    remainingNum={remainingNum}
                    showNumOfRemainingPhotos={true}
                    openLightbox={openLightbox}
                />
                <ModalGateway>
                    { 
                        viewerIsOpen ? 
                        (
                            <Modal onClose={closeLightbox}>
                                <Carousel views={photos} currentIndex={currentImage} />
                            </Modal>
                        ) : null
                    }
                </ModalGateway>
            </React.Fragment>
        );
    }

    return null;
}

export default ReactPhotoCollageContainer;