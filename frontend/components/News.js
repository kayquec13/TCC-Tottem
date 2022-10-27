import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function news() {
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
            title={<span>{item.newPrice}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://img.lojasrenner.com.br/item/660044754/large/12.jpg',
    newPrice: 'R$ 69,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/630613303/large/12.jpg',
    newPrice: '79,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/546312903/large/12.jpg',
    newPrice: 'R$ 39,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/659448241/large/12.jpg',
    newPrice: 'R$ 79,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/638420590/large/12.jpg',
    newPrice: 'R$ 49,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/626471120/large/12.jpg',
    newPrice: 'R$ 99,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/675046875/large/12.jpg',
    newPrice: 'R$ 42,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/658849094/large/12.jpg',
    newPrice: 'R$ 39,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/637199555/large/12.jpg',
    newPrice: 'R$ 229,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/685252120/large/3.jpg',
    newPrice: 'R$ 79,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/654646417/large/12.jpg',
    newPrice: 'R$ 29,90'
  },
  {
    img: 'https://img.lojasrenner.com.br/item/549766409/large/10.jpg',
    newPrice: 'R$ 79,90'
  },
];
