import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none">
      <Image
        src={"/avatar.png"}
        width={400}
        height={300}
        alt="Avatar"
        className="transtralte-z-0 bg-foreground/90 
        border border-foreground/30 rounded-3xl absolute left-20 top-20"
      />
    </div>
  );
};

export default Avatar;
