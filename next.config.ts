import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's default imageSizes jumps 128 -> 256, which is too coarse for
    // small fixed-size assets like the header/footer logo (~40px, up to
    // 3x DPR): it forces a much bigger file than needed. 160 fills that gap.
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 224, 288, 384],
  },
};

export default nextConfig;
