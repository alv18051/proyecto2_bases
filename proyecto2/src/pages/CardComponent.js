import React from 'react';
import { Image, Stack } from '@chakra-ui/react';
import './search.css'
import { Link } from 'react-router-dom';

const CardComponent = ({ fun, title, link, image  }) => {

  const colors = {
      fondo: 'rgb(223 225 225)',
      verde: 'rgb(174 213 142)',
      white: 'rgb(181 142 213)',
      naranja: 'rgb(37, 150, 190)',
      verde2: '#97db75',
      verde3: '#ace291',
      verde4: '#b6e69e'
  }

  return (
    <div className='CardCont'>
        <Stack align='center'>
            <Image className='imgS' borderRadius='10px' boxSize='150px' objectFit='cover' src={image} alt='Foto' />
            <a className='nombreS' href={link} id="v1" ><b>{title}</b></a>
        </Stack>

    </div>
  )
}

export default CardComponent