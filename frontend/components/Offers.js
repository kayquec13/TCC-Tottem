import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Offers() {
  return (
    <ImageList cols={4} gap={40} style={{margin: 'auto'}}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            style={{ width: '15vw', height: '40vh'}}
            alt={item.newPrice}
            loading="lazy"
          />
          <ImageListItemBar
            title={<span style={{ color: 'green'}}>{item.newPrice}</span>}
            subtitle={<span style={{ textDecoration: 'line-through'}}>{item.oldPrice}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://img.lojasrenner.com.br/item/601827118/large/12.jpg',
    newPrice: 'R$ 69,90',
    oldPrice: 'R$ 89,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/597003781/large/12.jpg',
    newPrice: '79,90',
    oldPrice: 'R$ 119,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/636595732/large/12.jpg',
    newPrice: 'R$ 39,90',
    oldPrice: 'R$ 79,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/560909028/large/10.jpg',
    newPrice: 'R$ 79,90',
    oldPrice: 'R$ 159,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/605436288/large/10.jpg',
    newPrice: 'R$ 49,90',
    oldPrice: 'R$ 69,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/551492697/large/10.jpg',
    newPrice: 'R$ 99,90',
    oldPrice: 'R$ 119,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/634828660/large/3.jpg',
    newPrice: 'R$ 12,90',
    oldPrice: 'R$ 17,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/601797828/large/12.jpg',
    newPrice: 'R$ 39,90',
    oldPrice: 'R$ 79,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/551126195/large/12.jpg',
    newPrice: 'R$ 229,90',
    oldPrice: 'R$ 349,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/616832577/large/12.jpg',
    newPrice: 'R$ 79,90',
    oldPrice: 'R$ 99,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/551928438/large/12.jpg',
    newPrice: 'R$ 29,90',
    oldPrice: 'R$ 59,90',
  },
  {
    img: 'https://img.lojasrenner.com.br/item/549766409/large/10.jpg',
    newPrice: 'R$ 79,90',
    oldPrice: 'R$ 139,90',
  },
];
