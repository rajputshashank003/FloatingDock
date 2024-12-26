import { IconBrandProducthunt, IconBrandTwitter, IconHome, IconPlus, IconUserCircle } from '@tabler/icons-react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react'

function App() {
  const items = [
    {
      title : "Home",
      icon : <IconHome className='h-full w-full' />
    } ,
    {
      title : "product",
      icon : <IconBrandProducthunt className='h-full w-full' />
    },
    {
      title : "add",
      icon : <IconPlus className='h-full w-full' />
    },
    {
      title : "twitter",
      icon : <IconBrandTwitter className='h-full w-full' />
    },
    {
      title : "profile",
      icon : <IconUserCircle className='h-full w-full' />
    }
  ];
  
  const mouseX = useMotionValue(Infinity);
  return (
    <div className='flex justify-center items-center h-screen bg-neutral-700'>
      <div className='bg-gray-400 text-gray-200 p-8 rounded-2xl text-4xl'>
        Floating Dock
      </div>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={(e) => mouseX.set(Infinity)}
        className='fixed bottom-10 inset-x-0 mx-auto h-16 flex items-center justify-center w-fit bg-gray-100 p-4 rounded-2xl'
      >
      {
        items.map((item, index) => (
          <IconsComponent key={index} mouseX={mouseX} item={item}/>
        ))
      }
      </motion.div>
    </div>
  )
}

export default App

function IconsComponent({item, mouseX}) {

  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref?.current?.getBoundingClientRect() ?? {x : 0 , width : 0};
    return val - (bounds.x + bounds.width / 2);
  });

  let widthTransform = useTransform(distance, [-150 , 0 , 150], [40 , 80 , 40]);
  let heightTransform = useTransform(distance, [-150 , 0 , 150], [40 , 80 , 40]);

  let widthIconTransform = useTransform(distance, [-150 , 0 , 150], [20 , 40 , 20]);
  let heightIconTransform = useTransform(distance, [-150 , 0 , 150], [20 , 40 , 20]);

  const width = useSpring(widthTransform , {
    mass : 0.1,
    stiffness : 150,
    damping : 12
  });
  const height = useSpring(heightTransform , {
    mass : 0.1,
    stiffness : 150,
    damping : 12
  });

  const [hover, setHover] = useState(false);

  return (
      <motion.div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height,
          width 
        }}
        className='relative p-3 flex items-center justify-center cursor-pointer mx-2 my-0 bg-gray-300 rounded-full'
      >
        <AnimatePresence>
          {
            hover && 
            <motion.div 
            initial={{
                opacity : 0,
                y : 10,
                x : "-50%"
              }}
              animate={{
                opacity : 1,
                y : 0,
                x : "-50%"
              }}
              exit={{
                opacity : 0,
                y : 2,
                x : "-50%"
              }}
              className='absolute whitespace-pre text-gray-800 px-2 flex justify-center items-center bg-gray-300 rounded-md left-1/2 -translate-x-1/2 -top-8'
            >
              {item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}
            </motion.div>
          }
          </AnimatePresence>
          <motion.div
            style={{
              height : heightIconTransform,
              width : widthIconTransform
            }}  
            className='flex items-center justify-center '
            >
            {item.icon}
          </motion.div>
      </motion.div>
  )
}