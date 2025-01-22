import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { Character } from "./Character";
import { Map } from "./Map";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import Ecctrl, { EcctrlAnimation } from "ecctrl";

const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -7, 0],
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -1, 10],
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -1, -3.5],
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6],
  },
};

// Prepare character model url
const characterURL = "/models/character.glb";

// Prepare and rename your character animations here
// Note: idle, walk, run, jump, jumpIdle, jumpLand and fall names are essential
// Missing any of these names might result in an error: "cannot read properties of undifined (reading 'reset')"
const animationSet = {
  idle: "Idle",
  walk: "Walk",
  wave: "Wave",
  run: "Run",
  jump: "Jump_Start",
  jumpIdle: "Jump_Idle",
  jumpLand: "Jump_Land",
  fall: "Climbing", // This is for falling from high sky
  // Currently support four additional animations
  action1: "Wave",
  action2: "Dance",
  action3: "Cheer",
  action4: "Attack(1h)", // This is special action which can be trigger while walking or running
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "castle_on_hills",
      options: Object.keys(maps),
    },
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        <CharacterController />
        {/* <Ecctrl 
          // camCollision={false} // disable camera collision detect (useless in FP mode)
          // camInitDis={-0.01} // camera intial position
          // camMinDis={-0.01} // camera zoom in closest position
          // camFollowMult={1000} // give a big number here, so the camera follows the target (character) instantly
          // camLerpMult={1000} // give a big number here, so the camera lerp to the followCam position instantly
          // turnVelMultiplier={1} // Turning speed same as moving speed
          // turnSpeed={100} // give it big turning speed to prevent turning wait time
          // mode="CameraBasedMovement" // character's rotation will follow camera's rotation in this mode
        animated 
        mode="FixedCamera" maxVelLimit={3} jumpVel={2}
        >
        <EcctrlAnimation
            characterURL={characterURL} // Must have property
            animationSet={animationSet} // Must have property
          >
          <RigidBody colliders={false} lockRotation>
            <Character scale={0.18} position-y={-0.25} animation={"idle"} />
          </RigidBody>
          </EcctrlAnimation>
        </Ecctrl> */}
      </Physics>
    </>
  );
};
