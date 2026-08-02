import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
  DepthOfField,
} from "@react-three/postprocessing";

/**
 * Focus pull cinématique : la distance de mise au point suit la progression
 * du scroll pour un effet "lentille" à la caméra — très C4D.
 */
function FocusPull({ dofRef, progressRef }) {
  useFrame((state) => {
    const dof = dofRef.current;
    if (!dof) return;
    const p = Math.min(Math.max(progressRef.current ?? 0, 0), 1);
    const e = 1 - Math.pow(1 - p, 1.6);
    const cam = state.camera;
    // La caméra avance vers -62 : on tire le focus avec elle (en unités monde)
    const worldFocus = 19 - e * 7;
    const normalized = (worldFocus - cam.near) / (cam.far - cam.near);
    dof.focusDistance = Math.min(Math.max(normalized, 0), 1);
    dof.focalLength = 0.16 - e * 0.05;
    dof.bokehScale = 2.6 + e * 1.4;
  });
  return null;
}

export function Effects({ bloomRef, mobile, progressRef }) {
  const dofRef = useRef(null);

  return (
    <EffectComposer multisampling={mobile ? 0 : 4}>
      <Bloom
        ref={bloomRef}
        intensity={0.8}
        luminanceThreshold={0.62}
        luminanceSmoothing={0.6}
        mipmapBlur
        radius={0.68}
      />
      <Vignette eskil={false} offset={0.18} darkness={0.7} />
      {!mobile && (
        <DepthOfField
          ref={dofRef}
          focusDistance={0.06}
          focalLength={0.16}
          bokehScale={2.6}
        />
      )}
      {!mobile && <ChromaticAberration offset={[0.0014, 0.0009]} />}
      {!mobile && <Noise premultiply opacity={0.045} />}
      {!mobile && <FocusPull dofRef={dofRef} progressRef={progressRef} />}
    </EffectComposer>
  );
}
