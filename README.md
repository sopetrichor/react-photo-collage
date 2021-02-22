# React Photo Collage

[![image](https://nodei.co/npm/react-photo-collage.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-photo-collage)

## Installation

```
npm install react-photo-collage
```

## Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Required</th>
      <th style="width: 50px;">Default</th>
      <th style="width: 50px;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>width</td>
      <td>string</td>
      <td>false</td>
      <td>800px</td>
      <td></td>
    </tr>
    <tr>
      <td>height</td>
      <td>an array of strings</td>
      <td>false</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>layout</td>
      <td>an array of strings</td>
      <td>true</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>photos</td>
      <td>an array of strings</td>
      <td>true</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td>showNumOfRemainingPhotos</td>
      <td>boolean</td>
      <td>true</td>
      <td>false</td>
      <td></td>
    </tr>
    <tr>
      <td>onClick(index: number)</td>
      <td>Function</td>
      <td>false</td>
      <td>null</td>
      <td>Will call this function instead of the lightbox</td>
    </tr>
    <tr>
      <td>moreItemsRenderer(itemsRemain: number)</td>
      <td>Function</td>
      <td>false</td>
      <td>null</td>
      <td>Render your component overlay instead of the default one</td>
    </tr>
    <tr>
      <td>gap</td>
      <td>number</td>
      <td>false</td>
      <td>2</td>
      <td>Pixels between photos</td>
    </tr>
    <tr>
      <td>showBorders</td>
      <td>boolean</td>
      <td>false</td>
      <td>true</td>
      <td>Show default border</td>
    </tr>
  </tbody>
</table>

## Usage
```js
import { ReactPhotoCollage } from "react-photo-collage";

const setting = {
  width: '600px',
  height: ['250px', '170px'],
  layout: [1, 4],
  photos: [
    { src: 'url/image-1.jpg' },
    { src: 'url/image-2.jpg' },
    { src: 'url/image-3.jpg' },
    { src: 'url/image-4.jpg' },
    { src: 'url/image-5.jpg' },
    { src: 'url/image-6.jpg' },
  ],
  showNumOfRemainingPhotos: true
};

function App() {
  return (
    <ReactPhotoCollage {...setting} />
  );
}
```

## Demo
![image](https://raw.githubusercontent.com/sopetrichor/react-photo-collage/master/preview.png)

[React-Photo-Collage-CodeSandbox](https://codesandbox.io/s/ecstatic-lake-qrj6u)

Photos courtesy of [Unsplash](https://unsplash.com/).

## Development
```
npm install
npm run demo
```
