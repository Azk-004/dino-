import { useState, useEffect, useRef } from 'react';
import CityScene from '../three/CityScene.jsx';

const SPLASH_DURATION = 10000;
// Le splash se referme automatiquement 15s après la fin des opérations
// (introduction de la ville, ~8s). Le bouton « Entrer » reste disponible à 10s.
const CITY_INTRO_MS = 8000;
const AUTO_EXIT_PAUSE_MS = 15000;

const LogoSvg = () => (
  <svg
    viewBox="52.0 97.0 775.0 710.0"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Logo Panotik se dessinant"
    className="w-full h-full"
    style={{ overflow: 'visible' }}
    shapeRendering="geometricPrecision"
  >
    <path d="M 471.0,190.0 L 471.0,183.0 L 466.0,175.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="1.950s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="1.950s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 454.0,184.0 L 470.0,191.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.028s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.028s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 471.0,192.0 L 491.0,209.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.106s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.106s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 492.0,210.0 L 500.0,225.0 L 534.0,257.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.184s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.184s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 498.0,207.0 L 493.0,209.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.262s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.262s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 455.0,224.0 L 453.0,209.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.340s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.340s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 454.0,225.0 L 446.0,223.0 L 437.0,214.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.418s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.418s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 455.0,226.0 L 474.0,250.0 L 496.0,267.0 L 496.0,273.0 L 441.0,341.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.496s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.132s" begin="2.496s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 428.0,450.0 L 428.0,429.0 L 418.0,333.0 L 420.0,258.0 L 417.0,233.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.646s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.189s" begin="2.646s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 390.0,413.0 L 386.0,407.0 L 377.0,404.0 L 379.0,413.0 L 391.0,426.0 L 419.0,449.0 L 427.0,451.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.853s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.077s" begin="2.853s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 428.0,451.0 L 431.0,478.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="2.948s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="2.948s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 430.0,479.0 L 423.0,478.0 L 393.0,444.0 L 375.0,435.0 L 367.0,425.0 L 359.0,420.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.026s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.082s" begin="3.026s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 431.0,480.0 L 437.0,492.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.126s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.126s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 435.0,496.0 L 424.0,498.0 L 332.0,570.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.204s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.111s" begin="3.204s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 340.0,581.0 L 366.0,564.0 L 426.0,515.0 L 433.0,513.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.334s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.101s" begin="3.334s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 434.0,513.0 L 437.0,552.0 L 442.0,561.0 L 439.0,577.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.452s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.452s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 434.0,512.0 L 436.0,497.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.530s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.530s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 533.0,277.0 L 533.0,267.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.608s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.608s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 534.0,278.0 L 545.0,276.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.686s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.686s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 533.0,279.0 L 498.0,315.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.764s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.764s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 497.0,316.0 L 493.0,317.0 L 477.0,332.0 L 444.0,372.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="5.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.842s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.068s" begin="3.842s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 475.0,359.0 L 499.0,321.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="3.928s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="3.928s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 130.0,602.5 L 749.0,602.5" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.006s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.538s" begin="4.006s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 261.0,698.0 L 254.0,700.0 L 249.0,705.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.562s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="4.562s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 262.0,698.0 L 264.0,717.0 L 267.0,724.0 L 266.0,729.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.640s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="4.640s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 262.0,697.0 L 263.0,690.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.718s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="4.718s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 263.0,690.0 L 257.0,643.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.796s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="4.796s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 257.0,641.0 L 257.0,633.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.874s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="4.874s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 258.0,632.0 L 271.0,631.0 L 289.0,635.0 L 306.0,650.0 L 303.0,661.0 L 275.0,685.0 L 263.0,690.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="4.952s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.100s" begin="4.952s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 257.0,631.0 L 256.0,626.0 L 259.0,621.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.071s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.071s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 307.0,711.0 L 301.0,700.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.149s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.149s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 301.0,698.0 L 309.0,690.0 L 323.0,686.0 L 338.0,687.0 L 342.0,691.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.227s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.227s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 348.0,718.0 L 340.0,708.0 L 319.0,713.0 L 308.0,712.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.305s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.305s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 385.0,717.0 L 375.0,689.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.383s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.383s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 387.0,717.0 L 394.0,713.0 L 398.0,705.0 L 404.0,700.0 L 412.0,704.0 L 417.0,711.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.461s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.461s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 386.0,718.0 L 385.0,723.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="6.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.539s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.539s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 455.0,713.0 L 457.0,715.0 L 466.0,715.0 L 477.0,707.0 L 480.0,695.0 L 474.0,688.0 L 462.0,688.0 L 441.0,703.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.617s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.074s" begin="5.617s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 455.0,713.0 L 458.0,706.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.709s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.709s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 501.0,641.0 L 503.0,636.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="5.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.787s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.787s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 501.0,642.0 L 512.0,692.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.0" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.865s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.865s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 513.0,693.0 L 516.0,708.0 L 514.0,713.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="5.943s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="5.943s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 514.0,692.0 L 542.0,678.0 L 553.0,677.0 L 556.0,681.0 L 558.0,702.0 L 563.0,709.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.021s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.067s" begin="6.021s" fill="freeze" calcMode="linear" />
    </path>
    <circle cx="558.5" cy="644.5" r="6.5" fill="currentColor" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.14s" begin="6.106s" fill="freeze" />
    </circle>
    <path d="M 589.0,651.0 L 589.0,665.0 L 592.0,677.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.264s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="6.264s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 592.0,678.0 L 593.0,708.0 L 597.0,713.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.342s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="6.342s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 597.0,713.0 L 609.0,706.0 L 614.0,698.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.420s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="6.420s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 615.0,697.0 L 620.0,696.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.498s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="6.498s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 621.0,696.0 L 647.0,698.0 L 672.0,696.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="8.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.576s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.060s" begin="6.576s" fill="freeze" calcMode="linear" />
    </path>
    <path d="M 621.0,695.0 L 632.0,675.0 L 633.0,665.0 L 630.0,661.0 L 623.0,662.0 L 615.0,667.0 L 609.0,677.0 L 607.0,688.0 L 614.0,696.0" pathLength="100" fill="none" stroke="currentColor" strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="100" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.001s" begin="6.654s" fill="freeze" />
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.076s" begin="6.654s" fill="freeze" calcMode="linear" />
    </path>
    {/* Accent dots */}
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="1.950s" fill="freeze" /><animateMotion dur="0.060s" begin="1.950s" fill="freeze" path="M 471.0,190.0 L 471.0,183.0 L 466.0,175.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.028s" fill="freeze" /><animateMotion dur="0.060s" begin="2.028s" fill="freeze" path="M 454.0,184.0 L 470.0,191.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.106s" fill="freeze" /><animateMotion dur="0.060s" begin="2.106s" fill="freeze" path="M 471.0,192.0 L 491.0,209.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.184s" fill="freeze" /><animateMotion dur="0.060s" begin="2.184s" fill="freeze" path="M 492.0,210.0 L 500.0,225.0 L 534.0,257.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.262s" fill="freeze" /><animateMotion dur="0.060s" begin="2.262s" fill="freeze" path="M 498.0,207.0 L 493.0,209.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.340s" fill="freeze" /><animateMotion dur="0.060s" begin="2.340s" fill="freeze" path="M 455.0,224.0 L 453.0,209.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.418s" fill="freeze" /><animateMotion dur="0.060s" begin="2.418s" fill="freeze" path="M 454.0,225.0 L 446.0,223.0 L 437.0,214.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.132s" begin="2.496s" fill="freeze" /><animateMotion dur="0.132s" begin="2.496s" fill="freeze" path="M 455.0,226.0 L 474.0,250.0 L 496.0,267.0 L 496.0,273.0 L 441.0,341.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.189s" begin="2.646s" fill="freeze" /><animateMotion dur="0.189s" begin="2.646s" fill="freeze" path="M 428.0,450.0 L 428.0,429.0 L 418.0,333.0 L 420.0,258.0 L 417.0,233.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.077s" begin="2.853s" fill="freeze" /><animateMotion dur="0.077s" begin="2.853s" fill="freeze" path="M 390.0,413.0 L 386.0,407.0 L 377.0,404.0 L 379.0,413.0 L 391.0,426.0 L 419.0,449.0 L 427.0,451.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="2.948s" fill="freeze" /><animateMotion dur="0.060s" begin="2.948s" fill="freeze" path="M 428.0,451.0 L 431.0,478.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.082s" begin="3.026s" fill="freeze" /><animateMotion dur="0.082s" begin="3.026s" fill="freeze" path="M 430.0,479.0 L 423.0,478.0 L 393.0,444.0 L 375.0,435.0 L 367.0,425.0 L 359.0,420.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.126s" fill="freeze" /><animateMotion dur="0.060s" begin="3.126s" fill="freeze" path="M 431.0,480.0 L 437.0,492.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.111s" begin="3.204s" fill="freeze" /><animateMotion dur="0.111s" begin="3.204s" fill="freeze" path="M 435.0,496.0 L 424.0,498.0 L 332.0,570.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.101s" begin="3.334s" fill="freeze" /><animateMotion dur="0.101s" begin="3.334s" fill="freeze" path="M 340.0,581.0 L 366.0,564.0 L 426.0,515.0 L 433.0,513.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.452s" fill="freeze" /><animateMotion dur="0.060s" begin="3.452s" fill="freeze" path="M 434.0,513.0 L 437.0,552.0 L 442.0,561.0 L 439.0,577.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.530s" fill="freeze" /><animateMotion dur="0.060s" begin="3.530s" fill="freeze" path="M 434.0,512.0 L 436.0,497.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.608s" fill="freeze" /><animateMotion dur="0.060s" begin="3.608s" fill="freeze" path="M 533.0,277.0 L 533.0,267.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.686s" fill="freeze" /><animateMotion dur="0.060s" begin="3.686s" fill="freeze" path="M 534.0,278.0 L 545.0,276.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.764s" fill="freeze" /><animateMotion dur="0.060s" begin="3.764s" fill="freeze" path="M 533.0,279.0 L 498.0,315.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.068s" begin="3.842s" fill="freeze" /><animateMotion dur="0.068s" begin="3.842s" fill="freeze" path="M 497.0,316.0 L 493.0,317.0 L 477.0,332.0 L 444.0,372.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="3.928s" fill="freeze" /><animateMotion dur="0.060s" begin="3.928s" fill="freeze" path="M 475.0,359.0 L 499.0,321.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.538s" begin="4.006s" fill="freeze" /><animateMotion dur="0.538s" begin="4.006s" fill="freeze" path="M 130.0,602.5 L 749.0,602.5" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="4.562s" fill="freeze" /><animateMotion dur="0.060s" begin="4.562s" fill="freeze" path="M 261.0,698.0 L 254.0,700.0 L 249.0,705.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="4.640s" fill="freeze" /><animateMotion dur="0.060s" begin="4.640s" fill="freeze" path="M 262.0,698.0 L 264.0,717.0 L 267.0,724.0 L 266.0,729.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="4.718s" fill="freeze" /><animateMotion dur="0.060s" begin="4.718s" fill="freeze" path="M 262.0,697.0 L 263.0,690.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="4.796s" fill="freeze" /><animateMotion dur="0.060s" begin="4.796s" fill="freeze" path="M 263.0,690.0 L 257.0,643.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="4.874s" fill="freeze" /><animateMotion dur="0.060s" begin="4.874s" fill="freeze" path="M 257.0,641.0 L 257.0,633.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.100s" begin="4.952s" fill="freeze" /><animateMotion dur="0.100s" begin="4.952s" fill="freeze" path="M 258.0,632.0 L 271.0,631.0 L 289.0,635.0 L 306.0,650.0 L 303.0,661.0 L 275.0,685.0 L 263.0,690.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.071s" fill="freeze" /><animateMotion dur="0.060s" begin="5.071s" fill="freeze" path="M 257.0,631.0 L 256.0,626.0 L 259.0,621.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.149s" fill="freeze" /><animateMotion dur="0.060s" begin="5.149s" fill="freeze" path="M 307.0,711.0 L 301.0,700.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.227s" fill="freeze" /><animateMotion dur="0.060s" begin="5.227s" fill="freeze" path="M 301.0,698.0 L 309.0,690.0 L 323.0,686.0 L 338.0,687.0 L 342.0,691.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.305s" fill="freeze" /><animateMotion dur="0.060s" begin="5.305s" fill="freeze" path="M 348.0,718.0 L 340.0,708.0 L 319.0,713.0 L 308.0,712.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.383s" fill="freeze" /><animateMotion dur="0.060s" begin="5.383s" fill="freeze" path="M 385.0,717.0 L 375.0,689.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.461s" fill="freeze" /><animateMotion dur="0.060s" begin="5.461s" fill="freeze" path="M 387.0,717.0 L 394.0,713.0 L 398.0,705.0 L 404.0,700.0 L 412.0,704.0 L 417.0,711.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.539s" fill="freeze" /><animateMotion dur="0.060s" begin="5.539s" fill="freeze" path="M 386.0,718.0 L 385.0,723.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.074s" begin="5.617s" fill="freeze" /><animateMotion dur="0.074s" begin="5.617s" fill="freeze" path="M 455.0,713.0 L 457.0,715.0 L 466.0,715.0 L 477.0,707.0 L 480.0,695.0 L 474.0,688.0 L 462.0,688.0 L 441.0,703.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.709s" fill="freeze" /><animateMotion dur="0.060s" begin="5.709s" fill="freeze" path="M 455.0,713.0 L 458.0,706.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.787s" fill="freeze" /><animateMotion dur="0.060s" begin="5.787s" fill="freeze" path="M 501.0,641.0 L 503.0,636.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.865s" fill="freeze" /><animateMotion dur="0.060s" begin="5.865s" fill="freeze" path="M 501.0,642.0 L 512.0,692.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="5.943s" fill="freeze" /><animateMotion dur="0.060s" begin="5.943s" fill="freeze" path="M 513.0,693.0 L 516.0,708.0 L 514.0,713.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.067s" begin="6.021s" fill="freeze" /><animateMotion dur="0.067s" begin="6.021s" fill="freeze" path="M 514.0,692.0 L 542.0,678.0 L 553.0,677.0 L 556.0,681.0 L 558.0,702.0 L 563.0,709.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="6.264s" fill="freeze" /><animateMotion dur="0.060s" begin="6.264s" fill="freeze" path="M 589.0,651.0 L 589.0,665.0 L 592.0,677.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="6.342s" fill="freeze" /><animateMotion dur="0.060s" begin="6.342s" fill="freeze" path="M 592.0,678.0 L 593.0,708.0 L 597.0,713.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="6.420s" fill="freeze" /><animateMotion dur="0.060s" begin="6.420s" fill="freeze" path="M 597.0,713.0 L 609.0,706.0 L 614.0,698.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="6.498s" fill="freeze" /><animateMotion dur="0.060s" begin="6.498s" fill="freeze" path="M 615.0,697.0 L 620.0,696.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.060s" begin="6.576s" fill="freeze" /><animateMotion dur="0.060s" begin="6.576s" fill="freeze" path="M 621.0,696.0 L 647.0,698.0 L 672.0,696.0" /></circle>
    <circle r="4.4" fill="#c19a6b" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.076s" begin="6.654s" fill="freeze" /><animateMotion dur="0.076s" begin="6.654s" fill="freeze" path="M 621.0,695.0 L 632.0,675.0 L 633.0,665.0 L 630.0,661.0 L 623.0,662.0 L 615.0,667.0 L 609.0,677.0 L 607.0,688.0 L 614.0,696.0" /></circle>
  </svg>
);

export default function SplashScreen({ onComplete, showAdWorld = true }) {
  const [animating, setAnimating] = useState(true);
  const [showEnter, setShowEnter] = useState(false);
  const [cityStarted, setCityStarted] = useState(false);
  const svgRef = useRef(null);

  // Day/night mode — default night, reads from localStorage
  const [isNight, setIsNight] = useState(() => {
    return localStorage.getItem('panotik-mode') !== 'day';
  });

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // After 10s, show the "Entrer" button — no auto-dismiss
    const timer = setTimeout(() => {
      setShowEnter(true);
    }, SPLASH_DURATION);

    // L'intro de la ville ne commence qu'après le dessin complet du logo
    // (dernier trait à ~6,7s) : pendant ce temps la caméra reste à l'arrêt
    // sur l'image de fond, la ville est sombre et figée.
    const cityTimer = setTimeout(() => {
      setCityStarted(true);
    }, 6800);

    return () => {
      clearTimeout(timer);
      clearTimeout(cityTimer);
      document.body.style.overflow = '';
    };
  }, []);

  // Minuteur d'auto-fermeture : démarre quand la ville démarre, puis
  // s'exécute 15s APRÈS la fin de l'introduction (~8s). Le bouton
  // « Entrer » reste disponible à 10s pour ceux qui veulent passer.
  useEffect(() => {
    if (!cityStarted) return undefined;
    const exitTimer = setTimeout(() => {
      setAnimating(false);
      setTimeout(() => {
        document.body.style.overflow = '';
        onComplete?.();
      }, 800);
    }, CITY_INTRO_MS + AUTO_EXIT_PAUSE_MS);
    return () => clearTimeout(exitTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityStarted]);

  const handleEnter = () => {
    setAnimating(false);
    setTimeout(() => {
      document.body.style.overflow = '';
      onComplete?.();
    }, 800);
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (svgRef.current) {
      const parent = svgRef.current.parentNode;
      const newSvg = svgRef.current.cloneNode(true);
      parent.replaceChild(newSvg, svgRef.current);
      svgRef.current = newSvg;
    }
  };

  // Mode-dependent tokens
  const bg = isNight ? 'var(--color-night, #0a0806)' : '#f5edd6';
  const textMain = isNight ? 'var(--color-cream, #fdfaf2)' : '#5c4a30';
  const textSub = isNight ? 'var(--color-mist, #c19a6b)' : '#8c7048';
  const btnBorder = isNight ? 'rgba(193,154,107,0.25)' : 'rgba(92,74,48,0.25)';
  const btnHoverBg = isNight ? 'rgba(193,154,107,0.08)' : 'rgba(58,46,31,0.06)';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
        opacity: animating ? 1 : 0,
        pointerEvents: animating ? 'auto' : 'none',
        background: bg,
      }}
    >
      {/* ── Ville 3D (Three.js / React Three Fiber) ── */}
      {showAdWorld && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CityScene mode={isNight ? 'night' : 'day'} started={cityStarted} />
        </div>
      )}

      {/* ── Calque noir pendant le dessin du logo ──
           Noir total tant que le logo se dessine, il s'estompe totalement
           ensuite pour laisser la ville éclairée et visible. */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-[1200ms]"
        style={{ background: '#050403', opacity: cityStarted ? 0 : 1 }}
      />
      {/* ── Halo sombre persistent centré sur logo + titre ──
           Petit fondu sombre juste derrière le logo/« PANOTIK »/texte pour
           garantir leur lisibilité (« même en mode jour ») sans assombrir le
           reste de la scène. */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(88% 74% at 50% 42%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0) 74%)',
        }}
      />

      {/* Logo */}
      <div
        ref={svgRef}
        className="relative z-10 cursor-pointer"
        style={{ width: 'min(60vw, 420px)', aspectRatio: '1/1', color: textMain }}
        onClick={handleReplay}
        title="Cliquer pour revoir l'animation"
      >
        <LogoSvg />
      </div>

      {/* ══════════ TAGLINE — VISIBLE EN TOUT TEMPS ══════════ */}
      <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '28px' }}>
        {/* Decorative line above */}
        <div style={{
          width: 'clamp(120px, 18vw, 220px)', height: '1px',
          background: isNight ? 'rgba(193,154,107,0.5)' : 'rgba(92,74,48,0.4)',
          marginBottom: '16px',
        }} />
        <p
          className="text-center leading-snug"
          style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: 'clamp(18px, 2.6vw, 30px)',
            fontWeight: 700,
            color: isNight ? '#fdfaf2' : '#3a2e1f',
            letterSpacing: '0.04em',
            maxWidth: '620px',
            padding: '0 24px',
            textShadow: isNight
              ? '0 0 10px rgba(255,214,160,0.9), 0 0 30px rgba(193,154,107,0.8), 0 0 60px rgba(193,154,107,0.5), 0 0 90px rgba(193,154,107,0.3), 0 4px 20px rgba(0,0,0,0.6)'
              : '0 0 8px rgba(255,214,160,0.7), 0 0 24px rgba(193,154,107,0.6), 0 0 48px rgba(193,154,107,0.35), 0 2px 12px rgba(0,0,0,0.15)',
            animation: 'textGlowPulse 3s ease-in-out infinite',
          }}
        >
          <span>Un réseau mondial de mobilier urbain de publicité s'annonce !</span>
        </p>
        {/* Decorative line below */}
        <div style={{
          width: 'clamp(120px, 18vw, 220px)', height: '1px',
          background: isNight ? 'rgba(193,154,107,0.5)' : 'rgba(92,74,48,0.4)',
          marginTop: '16px',
        }} />
      </div>

      {/* Enter button — appears after 10s */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEnter();
        }}
        className="relative z-10 mt-8 rounded-full border px-7 py-2.5 transition-all duration-300"
        style={{
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: textSub,
          borderColor: btnBorder,
          background: 'transparent',
          opacity: showEnter ? 1 : 0,
          pointerEvents: showEnter ? 'auto' : 'none',
          transition: 'opacity 0.8s ease-in-out, background 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = btnHoverBg; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        Entrer
      </button>

      {/* Day/Night toggle — bottom left */}
      <button
        onClick={() => setIsNight(!isNight)}
        className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300"
        style={{
          fontFamily: "'CenturyGothic', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: textSub,
          borderColor: btnBorder,
          background: 'transparent',
        }}
      >
        {isNight ? '☀' : '☾'}
        {isNight ? 'Jour' : 'Nuit'}
      </button>

      {/* ══════════ KEYFRAMES ══════════ */}
      <style>{`
        /* ── Splash core ── */
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoFadeOut {
          from { opacity: 1; transform: scale(1); filter: blur(0px); }
          to   { opacity: 0; transform: scale(0.55); filter: blur(10px); }
        }
        @keyframes textGlowPulse {
          0%, 100% { text-shadow: 0 0 12px rgba(255,214,160,0.85), 0 0 34px rgba(193,154,107,0.8), 0 0 70px rgba(193,154,107,0.45), 0 4px 20px rgba(0,0,0,0.5); }
          50%      { text-shadow: 0 0 18px rgba(255,224,178,1), 0 0 48px rgba(222,178,122,1), 0 0 100px rgba(222,178,122,0.7), 0 0 150px rgba(222,178,122,0.4), 0 4px 20px rgba(0,0,0,0.5); }
        }
        @keyframes rainFall {
          from { transform: translateY(0) rotate(6deg); opacity: 0.15; }
          20%  { opacity: 0.7; }
          100% { transform: translateY(125vh) rotate(6deg); opacity: 0.1; }
        }

        /* ── 3D World ── */
        @keyframes cameraFloat {
          0%   { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
          33%  { transform: translateY(-10px) rotateX(2deg) rotateZ(0.5deg); }
          66%  { transform: translateY(5px) rotateX(-1deg) rotateZ(-0.3deg); }
          100% { transform: translateY(-3px) rotateX(1deg) rotateZ(0.2deg); }
        }
        @keyframes ringSpin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        @keyframes ringSpinReverse {
          from { transform: rotateY(360deg); }
          to   { transform: rotateY(0deg); }
        }
        @keyframes billboardIn {
          0%   { opacity: 0; transform: scale(0.3) rotateX(15deg); filter: blur(16px); }
          50%  { opacity: 0.7; filter: blur(2px); }
          100% { opacity: 0.85; transform: scale(1) rotateX(0deg); filter: blur(0px); }
        }
        @keyframes boardBob {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes orbPulse {
          0%   { transform: scale(0.85); opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes gridReveal {
          from { opacity: 0; transform: rotateX(72deg) scaleY(0.2); }
          to   { opacity: 1; transform: rotateX(72deg) scaleY(1); }
        }
        @keyframes atmoBreath {
          0%   { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes rayPulse {
          0%   { opacity: 0; }
          100% { opacity: 0.5; }
        }
        @keyframes cubeSpin0 {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to   { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); }
        }
        @keyframes cubeSpin1 {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(-360deg) rotateY(360deg); }
        }
        @keyframes cubeSpin2 {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to   { transform: rotateY(360deg) rotateZ(-360deg); }
        }
        @keyframes orbitFloat0 {
          from { transform: rotateY(0deg) translateX(220px) translateY(15px); }
          to   { transform: rotateY(360deg) translateX(220px) translateY(15px); }
        }
        @keyframes orbitFloat1 {
          from { transform: rotateY(120deg) translateX(300px) translateY(-25px); }
          to   { transform: rotateY(480deg) translateX(300px) translateY(-25px); }
        }
        @keyframes orbitFloat2 {
          from { transform: rotateY(240deg) translateX(380px) translateY(10px); }
          to   { transform: rotateY(600deg) translateX(380px) translateY(10px); }
        }
        @keyframes particleDrift {
          0%   { transform: translate(0px, 0px); opacity: 0.05; }
          25%  { opacity: 0.4; }
          50%  { transform: translate(12px, -25px); opacity: 0.2; }
          75%  { opacity: 0.5; }
          100% { transform: translate(-8px, -50px); opacity: 0.15; }
        }

        /* ── Cityscape ── */
        @keyframes cityReveal {
          0%   { opacity: 0; transform: translateY(30px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        @keyframes starTwinkle {
          0%   { opacity: 0.1; transform: scale(0.8); }
          50%  { opacity: 0.8; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(1); }
        }

        /* ── Tagline ── */
      `}</style>
    </div>
  );
}
