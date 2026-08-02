import { Environment, Lightformer } from "@react-three/drei";

/**
 * Studio HDRI procédural — reproduit un éclairage "studio / C4D" :
 * panneau softbox au plafond + bandes néon latérales qui viennent
 * se refléter dans les cadres métalliques (reflets signature).
 */
export function StudioEnv({ day, accent = "#b4552d", accent2 = "#8a3b1e" }) {
  return (
    <Environment resolution={day ? 256 : 512} frames={1}>
      {/* Softbox principale (ciel) */}
      <Lightformer
        form="rect"
        intensity={day ? 6 : 2.2}
        position={[0, 12, -20]}
        rotation-x={Math.PI / 2}
        scale={[26, 34, 1]}
        color={day ? "#fff7e6" : "#3a2f1d"}
      />

      {/* Bandes néon latérales — se reflètent sur les cadres, teintées par l'univers */}
      <Lightformer
        form="rect"
        intensity={3}
        position={[-30, 5, -18]}
        rotation-y={Math.PI / 2}
        scale={[26, 7, 1]}
        color={accent}
      />
      <Lightformer
        form="rect"
        intensity={2.4}
        position={[30, 4, -18]}
        rotation-y={-Math.PI / 2}
        scale={[26, 5, 1]}
        color={accent2}
      />

      {/* Lueur lointaine au fond du boulevard */}
      <Lightformer
        form="rect"
        intensity={day ? 4 : 1.6}
        position={[0, 6, -70]}
        scale={[40, 16, 1]}
        color={day ? "#efe7d6" : "#2a2317"}
      />
    </Environment>
  );
}
