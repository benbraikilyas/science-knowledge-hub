'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const GSAP_EASE = {
  smooth: 'power3.out',
  cinematic: 'power4.out',
  bounce: 'back.out(1.4)',
  expo: 'expo.out',
  inOut: 'power3.inOut',
};
