

const Footer = () => {

  const today = new Date();

  return (
    <footer className='bg-[#fff] w-full fixed bottom-0 text-[#193920] px-5 py-3 font-bold shadow shadow[rgba(0,0,0,0.5)] z-50'>
      <p className='text-center'>maaskfed © {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer