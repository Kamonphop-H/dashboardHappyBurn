/** @format */

export default function navbar() {
  return (
    <div className='w-screen h-auto bg-[var(--nkt-primary)] text-white p-2 shadow-md z-20'>
      <div className='flex items-center justify-between mx-4'>
        <div className='text-xl font-bold rounded-full bg-white/50 p-2'>
          <div className='text-xl font-bold rounded-full bg-white flex flex-col-2 items-center p-2 justify-center'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Nakornthon_Hospital_Logo.svg/320px-Nakornthon_Hospital_Logo.svg.png'
              alt=''
              className='w-10 h-10 object-fill'
            />
          </div>
        </div>
        <div className='flex flex-col ms-2'>
          <h1 className='text-3xl font-bold'>Happy Burn Dashboard</h1>
          <p className='text-sm'>ก้าวเพลิน เผาผลาญแคล | โรงพยาบาลนครธน</p>
        </div>
        <div className='flex flex-row-1 flex-1 justify-end gap-2'>
          <input
            type='text'
            className='w-auto bg-white p-2 rounded-2xl text-black
             border border-gray-300 focus:outline-[var(--nkt-primary)]'
            placeholder='Search'
          />
          <button className='p-2 rounded-2xl border-2 hover:bg-white hover:text-[var(--nkt-primary-dark)] duration-500'>
            SignOut
          </button>
        </div>
      </div>
    </div>
  );
}
