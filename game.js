/* ============================================================
   MONSTER
============================================================ */

const monster = new THREE.Group();
const monsterRig = new THREE.Group();
monster.add(monsterRig);

const monsterShadowMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 1,
        metalness: 0
    });

const monsterFaceMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd8cfbb,
        roughness: 1,
        emissive: 0x17140d,
        emissiveIntensity: 0.08
    });

const monsterMouthMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 1
    });

const monsterShadow =
    new THREE.Mesh(
        new THREE.CircleGeometry(0.62, 24),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.34
        })
    );

monsterShadow.rotation.x = -Math.PI / 2;
monsterShadow.position.y = 0.02;
monster.add(monsterShadow);


/* =========================
   TORSO / HEAD
========================= */

const pelvis =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 10, 10),
        monsterShadowMaterial
    );

pelvis.scale.set(1.1, 0.8, 0.95);
pelvis.position.y = 0.95;
monsterRig.add(pelvis);


const torso =
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.21, 0.29, 1.5, 8),
        monsterShadowMaterial
    );

torso.position.y = 1.63;
monsterRig.add(torso);


const shoulderBridge =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.86, 0.17, 0.26),
        monsterShadowMaterial
    );

shoulderBridge.position.y = 2.27;
monsterRig.add(shoulderBridge);


const neck =
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.09, 0.28, 8),
        monsterShadowMaterial
    );

neck.position.y = 2.5;
monsterRig.add(neck);


const head =
    new THREE.Mesh(
        new THREE.SphereGeometry(0.29, 12, 12),
        monsterShadowMaterial
    );

head.scale.set(0.92, 1.22, 0.92);
head.position.y = 2.9;
monsterRig.add(head);


const facePlate =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.42, 0.03),
        monsterFaceMaterial
    );

facePlate.position.set(0, 2.88, -0.22);
monsterRig.add(facePlate);


const leftEyeSocket =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.05, 0.02),
        monsterMouthMaterial
    );

leftEyeSocket.position.set(-0.07, 2.93, -0.235);
monsterRig.add(leftEyeSocket);


const rightEyeSocket =
    leftEyeSocket.clone();

rightEyeSocket.position.set(0.07, 2.93, -0.235);
monsterRig.add(rightEyeSocket);


const mouthSlit =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.13, 0.018, 0.02),
        monsterMouthMaterial
    );

mouthSlit.position.set(0, 2.78, -0.235);
monsterRig.add(mouthSlit);


/* =========================
   LIMB BUILDER
========================= */

function buildLimb(
    sideX,
    rootY,
    upperLength,
    lowerLength,
    upperRadius,
    lowerRadius
) {
    const upperPivot = new THREE.Group();
    upperPivot.position.set(sideX, rootY, 0);

    const upper =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                upperRadius,
                upperRadius * 1.14,
                upperLength,
                8
            ),
            monsterShadowMaterial
        );

    upper.position.y = -upperLength / 2;
    upperPivot.add(upper);


    const lowerPivot = new THREE.Group();
    lowerPivot.position.y = -upperLength;

    const lower =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                lowerRadius,
                lowerRadius * 1.14,
                lowerLength,
                8
            ),
            monsterShadowMaterial
        );

    lower.position.y = -lowerLength / 2;
    lowerPivot.add(lower);


    upperPivot.add(lowerPivot);
    monsterRig.add(upperPivot);

    return {
        upperPivot,
        lowerPivot,
        upperLength,
        lowerLength
    };
}


/* =========================
   ARMS
========================= */

const leftArm =
    buildLimb(
        -0.38,
        2.22,
        1.02,
        1.10,
        0.072,
        0.055
    );

const rightArm =
    buildLimb(
        0.38,
        2.22,
        1.02,
        1.10,
        0.072,
        0.055
    );

leftArm.upperPivot.rotation.z = 0.24;
rightArm.upperPivot.rotation.z = -0.24;


const leftHand =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.16, 0.07),
        monsterShadowMaterial
    );

leftHand.position.set(0, -1.08, 0);
leftArm.lowerPivot.add(leftHand);

const rightHand =
    leftHand.clone();

rightHand.position.set(0, -1.08, 0);
rightArm.lowerPivot.add(rightHand);


/* =========================
   LEGS
========================= */

const leftLeg =
    buildLimb(
        -0.16,
        0.97,
        0.98,
        1.01,
        0.095,
        0.074
    );

const rightLeg =
    buildLimb(
        0.16,
        0.97,
        0.98,
        1.01,
        0.095,
        0.074
    );

leftLeg.upperPivot.rotation.z = 0.03;
rightLeg.upperPivot.rotation.z = -0.03;


const leftFoot =
    new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.06, 0.30),
        monsterShadowMaterial
    );

leftFoot.position.set(0, -1.00, 0.11);
leftLeg.lowerPivot.add(leftFoot);

const rightFoot =
    leftFoot.clone();

rightFoot.position.set(0, -1.00, 0.11);
rightLeg.lowerPivot.add(rightFoot);


/* =========================
   OVERALL MONSTER LOOK
========================= */

monsterRig.rotation.x = 0.05;
monsterRig.position.y = 0;


/* monster starts away from player */

const monsterStart =
    cellWorld(
        Math.floor(GRID_WIDTH * 0.62),
        Math.floor(GRID_HEIGHT * 0.62)
    );

monster.position.set(
    monsterStart.x,
    0,
    monsterStart.z
);

scene.add(monster);

let monsterPath = [];
let monsterPathTimer = 0;
let monsterActiveTimer = 12;
