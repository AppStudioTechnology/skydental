import imgRectangle161125373 from "../assets/531a2b1be40c3f390e42e72de4c6233edf51733e.webp";

function MaskGroup() {
  return (
    <div className="absolute contents left-[14px] top-[12px]" data-name="Mask group">
      <div className="absolute bg-[#0C0060] h-[48.058px] left-[1.95px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.048px_3.837px] mask-size-[26.048px_28px] top-[8.16px] w-[50.75px]" style={{ maskImage: `url('${imgRectangle161125373}')` }} />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#cbff8f] left-0 rounded-[100px] size-[53px] top-0" />
      <MaskGroup />
    </div>
  );
}