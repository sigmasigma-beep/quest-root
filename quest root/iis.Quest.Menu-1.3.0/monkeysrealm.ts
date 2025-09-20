// ii's Quest Menu, by @goldentrophy / @crimsoncauldron
// Warning: Ugly code. I hate TypeScript.
// Ported To Monkeys Realm By @__fys

declare const Il2Cpp: any;
declare const console: any;
declare const XRNode: any;

let buttonClickDelay = 0.0;
let menu = null;
let reference = null;
let referenceCollider = null;

let leftPrimary = false;
let leftSecondary = false;

let rightPrimary = false;
let rightSecondary = false;

let leftGrab = false;
let rightGrab = false;

let leftTrigger = false;
let rightTrigger = false;

let deltaTime = 0.0;
let time = 0.0;

let previousGhostKey = false;
let previousInvisKey = false;
let previousNoclipKey = false;
let perviousTeleportKey = false;

let closePosition = null;
let tagGunDelay = 0.0;

let currentNotification: string = "";
let notifactionResetTime: number = 0;

let leftPlatform = null;
let rightPlatform = null;

let lvT = null;
let rvT = null;

let bgColor: [number, number, number, number] = [0.98, 0.90, 0.95, 1.0];
let textColor: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0];

let buttonColor: [number, number, number, number] = [0.96, 0.75, 0.85, 1.0];
let buttonPressedColor: [number, number, number, number] = [1.0, 0.85, 0.95, 1.0];

let menuName: string = "FYS's <b>Epic</b> Menu ";
let themeIndex = 0;

Il2Cpp.perform(() => {
    const images = {
        "Assembly-CSharp": Il2Cpp.domain.assembly("Assembly-CSharp").image,
        "UnityEngine.CoreModule": Il2Cpp.domain.assembly("UnityEngine.CoreModule").image,
        "UnityEngine.PhysicsModule": Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image,
        "UnityEngine.UIModule": Il2Cpp.domain.assembly("UnityEngine.UIModule").image,
        "UnityEngine.UI": Il2Cpp.domain.assembly("UnityEngine.UI").image,
        "UnityEngine.TextRenderingModule": Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image,
        "PhotonUnityNetworking": Il2Cpp.domain.assembly("PhotonUnityNetworking").image
    };

    const AssemblyCSharp = images["Assembly-CSharp"];
    const UnityEngineCore = images["UnityEngine.CoreModule"];
    const UnityEnginePhysics = images["UnityEngine.PhysicsModule"];
    const UnityEngineUI = images["UnityEngine.UI"];
    const UnityEngineUIModule = images["UnityEngine.UIModule"];
    const UnityEngineTextRendering = images["UnityEngine.TextRenderingModule"];
    const PhotonUnityNetworking = images["PhotonUnityNetworking"];
    const UnityEngineXR = images["UnityEngine.XRModule"];

    const BoxColliderClass = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const GTPlayerClass = AssemblyCSharp.class("GorillaLocomotion1.Player");
    const SkinButton = AssemblyCSharp.class("SkinCosmeticEnableButton");
    const PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork");
    const GTPlayer = GTPlayerClass.method("get_Instance").invoke();

    const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
    const Object = UnityEngineCore.class("UnityEngine.Object");
    const Vector3 = UnityEngineCore.class("UnityEngine.Vector3");
    const Quaternion = UnityEngineCore.class("UnityEngine.Quaternion");
    const Time = UnityEngineCore.class("UnityEngine.Time");
    const Resources = UnityEngineCore.class("UnityEngine.Resources");
    const Material = UnityEngineCore.class("UnityEngine.Material");
    const Renderer = UnityEngineCore.class("UnityEngine.Renderer");
    const Shader = UnityEngineCore.class("UnityEngine.Shader");
    const Color = UnityEngineCore.class("UnityEngine.Color");
    const RectTransform = UnityEngineCore.class("UnityEngine.RectTransform");
    const LineRenderer = UnityEngineCore.class("UnityEngine.LineRenderer");
    const PlayerPrefs = UnityEngineCore.class("UnityEngine.PlayerPrefs");

    const MeshCollider = UnityEnginePhysics.class("UnityEngine.MeshCollider");
    const BoxCollider = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const Collider = UnityEnginePhysics.class("UnityEngine.Collider");
    const Rigidbody = UnityEnginePhysics.class("UnityEngine.Rigidbody");
    const Physics = UnityEnginePhysics.class("UnityEngine.Physics");
    const Ray = UnityEngineCore.class("UnityEngine.Ray");
    const RaycastHit = UnityEnginePhysics.class("UnityEngine.RaycastHit");

    const Canvas = UnityEngineUIModule.class("UnityEngine.Canvas");
    const CanvasScaler = UnityEngineUI.class("UnityEngine.UI.CanvasScaler");
    const GraphicRaycaster = UnityEngineUI.class("UnityEngine.UI.GraphicRaycaster");
    const Text = UnityEngineUI.class("UnityEngine.UI.Text");
    const Font = UnityEngineTextRendering.class("UnityEngine.Font");

    const rigidbody = GTPlayer.field("playerRigidBody").value;

    const UberShader = Shader.method("Find").invoke(Il2Cpp.string("Universal Render Pipeline/Lit"));
    const TextShader = Shader.method("Find").invoke(Il2Cpp.string("GUI/Text Shader"));

    const zeroVector = Vector3.field("zeroVector").value;
    const oneVector = Vector3.field("oneVector").value;
    const identityQuaternion = Quaternion.field("identityQuaternion").value;

    const leftHandTransform = GTPlayer.field("leftHandTransform").value;
    const rightHandTransform = GTPlayer.field("rightHandTransform").value;
    const headCollider = GTPlayer.field("headCollider").value;
    const bodyCollider = GTPlayer.field("bodyCollider").value;

    const PhotonVRClass = AssemblyCSharp.class("Photon.VR.PhotonVRManager");
    const manager = PhotonVRClass.field("<Manager>k__BackingField")?.value ?? PhotonVRClass.method("get_Manager")?.invoke();
    const ControllerInputPoller = AssemblyCSharp.class("GandysInputs").field("instance").value;
    const GameData = AssemblyCSharp.class("GameData");
    const MenuManager = AssemblyCSharp.class("MenuManager");
    const PlayfabManager = AssemblyCSharp.class("PlayfabManager");
    const ArcadeMachineManager = AssemblyCSharp.class("ArcadeMachineManager");
    const MeteoridEventManager = AssemblyCSharp.class("MeteoridEventManager");
    const SoundManager = AssemblyCSharp.class("SoundManager");
    const SoundBoardManager = AssemblyCSharp.class("SoundBoardManager");
    const BattleManager = AssemblyCSharp.class("Battle.BattleManager");

    const arial = Resources
        .method("GetBuiltinResource", 1)
        .inflate(Font)
        .invoke(Il2Cpp.string("Arial.ttf"));

    function Destroy(object) {
        Object.method("Destroy", 1).invoke(object);
    }

    function getComponent(obj: any, type) {
        return obj.method("GetComponent", 1).inflate(type).invoke();
    }

    function addComponent(obj: any, type) {
        return obj.method("AddComponent", 1).inflate(type).invoke();
    }

    function getComponentInParent(obj: any, type) {
        return obj.method("GetComponentInParent", 0).inflate(type).invoke();
    }

    function getOrAddComponent(obj: any, type) {
        let returnType = getComponent(obj, type);
        if (returnType != null && returnType != undefined) {
            return returnType
        }
        return addComponent(obj, type);
    }

    function getTransform(obj: any) {
        return obj.method("get_transform").invoke();
    }

    function world2Player(position) {
        position = Vector3.method("op_Subtraction", 2).invoke(position, getTransform(bodyCollider).method("get_position").invoke());
        position = Vector3.method("op_Addition", 2).invoke(position, getTransform(GTPlayer).method("get_position").invoke());
        return position;
    }

    function teleportPlayer(position) {
        GTPlayer.method("Teleport", 2).invoke(world2Player(position), getTransform(GTPlayer).method("get_rotation").invoke());
    }

    function sendAllOutgoing() {
        PhotonNetwork.method("SendAllOutgoingCommands").invoke();
    }

    function serialize() {
        PhotonNetwork.method("RunViewUpdate").invoke();
    }

    function renderMenuText(
        canvasObject,
        text: string = "",
        color: [number, number, number, number] = [1, 1, 1, 1],
        pos = zeroVector,
        size = oneVector
    ) {
        const title = addComponent(createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(canvasObject)), Text);
        title.method("set_text").invoke(Il2Cpp.string(text));
        title.method("set_font").invoke(arial);
        title.method("set_fontSize").invoke(1);
        title.method("set_color").invoke(color);
        title.method("set_fontStyle").invoke(2);
        title.method("set_alignment").invoke(4);
        title.method("set_resizeTextForBestFit").invoke(true);
        title.method("set_resizeTextMinSize").invoke(0);

        const rectTransform = getComponent(title, RectTransform);
        rectTransform.method("set_sizeDelta").invoke(size);
        rectTransform.method("set_position").invoke(pos);
        rectTransform.method("set_rotation").invoke(Quaternion.method("Euler").invoke(180.0, 90.0, 90.0))
    }

    function createObject(
        pos = zeroVector,
        rot = identityQuaternion,
        scale = oneVector,
        primitiveType: number = 3,
        colorArr: [number, number, number, number] = [1, 1, 1, 1],
        parent = null
    ) {
        const obj = GameObject.method("CreatePrimitive").invoke(primitiveType);

        const renderer = getComponent(obj, Renderer);

        if (colorArr[3] == 0) {
            renderer.method("set_enabled").invoke(false);
        } else {
            const material = renderer.method("get_material").invoke();
            material.method("set_shader").invoke(UberShader);
            material.method("set_color").invoke(colorArr);
        }

        const transform = getTransform(obj);
        if (parent != null) {
            transform.method("SetParent", 2).invoke(parent, false);
        }

        transform.method("set_position").invoke(pos);
        transform.method("set_rotation").invoke(rot);
        transform.method("set_localScale").invoke(scale);

        return obj;
    }
    function sendNotification(NotificationText: string = "", requiresReload: boolean = true, clearTime: number = 5) {
        const isOld = (currentNotification == NotificationText);
        notifactionResetTime = time + clearTime;
        currentNotification = NotificationText;
        if (requiresReload && !isOld)
            reloadMenu();
    }
    function renderMenu() {
        menu = createObject(zeroVector, identityQuaternion, [0.1, 0.3, 0.3825], 3, [0, 0, 0, 0]);
        Destroy(getComponent(menu, BoxCollider))

        const menuBackground = createObject([0.1, 0, 0], identityQuaternion, [0.1, 1, 1], 3, bgColor, getTransform(menu))
        Destroy(getComponent(menuBackground, BoxCollider))

        const canvasObject = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(menu));
        const canvas = addComponent(canvasObject, Canvas);
        Destroy(getComponent(canvasObject, BoxCollider))

        const canvasScaler = addComponent(canvasObject, CanvasScaler);
        addComponent(canvasObject, GraphicRaycaster);
        canvas.method("set_renderMode").invoke(2);
        canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1000.0);

        renderMenuText(canvasObject, menuName + `<color=grey>[</color><color=white>${currentPage + 1}</color><color=grey>]</color>`, textColor, [0.11, 0, 0.175], [1, 0.1]);

        if (time > notifactionResetTime)
            currentNotification = "";
        renderMenuText(canvasObject, currentNotification, textColor, [0.11, 0, 0.275], [1, 0.1]);

        const disconnectButton = createObject([0.1, 0.0, 0.225], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
        disconnectButton.method("set_name").invoke(Il2Cpp.string("@Disconnect"));

        addComponent(disconnectButton, SkinButton);
        getComponent(disconnectButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "Disconnect", textColor, [0.11, 0, 0.225], [1, 0.1]);

        {
            const pageButton = createObject([0.1, 0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@PreviousPage"));

            addComponent(pageButton, SkinButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, "<", textColor, [0.11, 0.2, 0], [1, 0.1]);
        }

        {
            const pageButton = createObject([0.1, -0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@NextPage"));

            addComponent(pageButton, SkinButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, ">", textColor, [0.11, -0.2, 0], [1, 0.1]);
        }

        let i = 0;
        const targetMods = buttons[currentCategory]
            .slice(currentPage * 8)
            .slice(0, 8);

        targetMods.forEach((buttonData, index) => {
            const button = createObject([0.105, 0, 0.13 - (i * 0.04)], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
            button.method("set_name").invoke(Il2Cpp.string("@" + buttonData.buttonText));

            addComponent(button, SkinButton);
            getComponent(button, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, buttonData.buttonText, textColor, [0.11, 0, 0.13 - (i * 0.04)], [1, 0.1]);
            updateButtonColor(button, buttonData);
            i++;
        });

        recenterMenu();
    }

    function renderReference() {
        reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, bgColor, rightHandTransform)
        referenceCollider = getComponent(reference, Collider);

        getTransform(reference).method("set_localPosition").invoke([0.01, -0.027, 0.2]);
        reference.method("set_layer").invoke(2);
        addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
    }

    let gunLocked = false;
    let lockTarget = null;
    let GunPointer = null;
    let GunLine = null;
    function renderGun(overrideLayerMask = null) {
        const StartPosition = rightHandTransform.method("get_position").invoke();
        const Direction = rightHandTransform.method("get_forward").invoke();

        const DirectionDivided = Vector3.method("op_Division").invoke(Direction, 4);
        const rayStartPosition = Vector3.method("op_Addition").invoke(StartPosition, DirectionDivided);

        const layerMask = overrideLayerMask || -3180559;

        const hits = Physics.method("RaycastAll", 4).invoke(
            rayStartPosition,  // origin (Vector3)
            Direction,         // direction (Vector3)
            512.0,            // maxDistance (float)
            layerMask         // layerMask (int)
        );

        let finalDistance = Infinity;
        let finalRay = null;
        for (const hit of hits) {
            const distance = Vector3.method("Distance").invoke(hit.method("get_point").invoke(), StartPosition);
            if (distance < finalDistance) {
                finalRay = hit;
                finalDistance = distance;
            }
        }

        let EndPosition;
        if (gunLocked) {
            EndPosition = getTransform(lockTarget).method("get_position").invoke();
        } else {
            EndPosition = finalRay.method("get_point").invoke();
        }

        if (Vector3.method("op_Equality").invoke(EndPosition, zeroVector)) {
            const farDirection = Vector3.method("op_Multiply").invoke(Direction, 512);
            EndPosition = Vector3.method("op_Addition").invoke(StartPosition, farDirection);
        }

        if (GunPointer == null) {
            GunPointer = createObject(EndPosition, identityQuaternion, [0.1, 0.1, 0.1], 0, [1, 1, 1, 1]);
        }

        GunPointer.method("SetActive").invoke(true);
        const pointerTransform = getTransform(GunPointer);
        pointerTransform.method("set_position").invoke(EndPosition);

        const PointerRenderer = getComponent(GunPointer, Renderer);
        const material = PointerRenderer.method("get_material").invoke();

        material.method("set_shader").invoke(TextShader);

        const pointerColor = (gunLocked || rightTrigger) ? buttonPressedColor : buttonColor;
        material.method("set_color").invoke(pointerColor);

        const collider = getComponent(GunPointer, Collider);
        if (collider != null) {
            Destroy(collider);
        }

        const lineWidth = 0.025;

        if (rightTrigger || gunLocked) {
            const Step = 10;
            for (let i = 1; i < (Step - 1); i++) {
                const t = i / (Step - 1);
                const Position = Vector3.method("Lerp").invoke(StartPosition, EndPosition, t);

                const randomValue = Math.random();
                let offset = zeroVector;

                if (randomValue > 0.75) {
                    offset = [
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1
                    ];
                }

                const finalPosition = Vector3.method("op_Addition").invoke(Position, offset);
            }

        }

        return { ray: finalRay, gunPointer: GunPointer };
    }

    function recenterMenu() {
        let menuPosition = leftHandTransform.method("get_position").invoke();
        let menuRotation = leftHandTransform.method("get_rotation").invoke();

        menuRotation = Quaternion.method("op_Multiply", 2).invoke(menuRotation, Quaternion.method("Euler").invoke(-45, 0, 0))

        const menuTransform = getTransform(menu);
        menuTransform.method("set_position").invoke(menuPosition);
        menuTransform.method("set_rotation").invoke(menuRotation);
    }

    function reloadMenu() {
        if (menu != null) {
            Object.method("Destroy", 1).invoke(menu);
            menu = null;
        }
    }

    function updateButtonColor(button, buttonData) {
        const RendererClass = Il2Cpp.domain
            .assembly("UnityEngine.CoreModule")
            .image
            .class("UnityEngine.Renderer");

        const renderer = getComponent(button, RendererClass);
        if (!renderer) {
            return;
        }

        const material = renderer.method("get_material").invoke();
        material.method("set_color").invoke(buttonData.enabled ? buttonPressedColor : buttonColor);
    }

    function toggleColliders(enabled) {
        const meshColliders = Object.method("FindObjectsOfType").inflate(MeshCollider).invoke();

        for (let i = 0; i < meshColliders.length; i++) {
            const meshCollider = meshColliders.get(i);
            meshCollider.method("set_enabled").invoke(enabled);
        }
    }

    interface ButtonInfoConfig {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable?: boolean;
        toolTip?: string;
        enabled?: boolean;
    }

    class ButtonInfo {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable: boolean;
        toolTip?: string;
        enabled: boolean;

        constructor(config: ButtonInfoConfig) {
            this.buttonText = config.buttonText;
            this.method = config.method;
            this.enableMethod = config.enableMethod;
            this.disableMethod = config.disableMethod;
            this.isTogglable = config.isTogglable ?? true;
            this.toolTip = config.toolTip ?? null;
            this.enabled = config.enabled ?? false;
        }
    }
    let ghostActive = false;
    let lastToggle = 0;
    const cooldown = 1000;
    let currentCategory = 0;
    let currentPage = 0;

    const buttons: ButtonInfo[][] = [
        [ // Main [0]
            new ButtonInfo({
                buttonText: "Settings",
                method: () => currentCategory = 2,
                isTogglable: false,
                toolTip: "Opens the settings category."
            }),
            new ButtonInfo({
                buttonText: "Movement Mods",
                method: () => currentCategory = 3,
                isTogglable: false,
                toolTip: "Opens the movement category."
            }),
            new ButtonInfo({
                buttonText: "Rig Mods",
                method: () => currentCategory = 4,
                isTogglable: false,
                toolTip: "Opens the fun category."
            }),
            new ButtonInfo({
                buttonText: "Overpowered Mods",
                method: () => currentCategory = 5,
                isTogglable: false,
                toolTip: "Opens the advantage category."
            }),
        ],

        [ // Hidden [1]
            new ButtonInfo({
                buttonText: "Disconnect",
                method: () => {
                    const disconnectMethod = manager.method("Disconnect");
                    if (disconnectMethod) disconnectMethod.invoke();
                },
                isTogglable: false,
                toolTip: "Disconnects you from the room."
            }),
            new ButtonInfo({
                buttonText: "PreviousPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage--;
                    if (currentPage < 0)
                        currentPage = lastPage;
                },
                isTogglable: false
            }),
            new ButtonInfo({
                buttonText: "NextPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage++;
                    currentPage %= lastPage + 1;
                },
                isTogglable: false
            })
        ],

        [ // Settings [2]
            new ButtonInfo({
                buttonText: "Exit Settings",
                method: () => currentCategory = 0,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Freeze Player in Menu",
                method: () => {
                    if (menu != null) {
                        if (closePosition == null) {
                            closePosition = getTransform(rigidbody).method("get_position").invoke();
                        }
                        else {
                            getTransform(rigidbody).method("set_position").invoke(closePosition);
                            rigidbody.method("set_velocity").invoke(zeroVector);
                        }
                    } else {
                        closePosition = null;
                    }
                },
                toolTip: "Freezes your character while in the menu."
            }),
        ],

        [ // Movement Mods [3]
            new ButtonInfo({
                buttonText: "Exit Movement Mods",
                method: () => currentCategory = 0,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Speed Boost",
                method: () => {
                    GTPlayer.field("maxJumpSpeed").value = 9.0;
                    GTPlayer.field("jumpMultiplier").value = 1.5;
                },
            }),
            new ButtonInfo({
                buttonText: "Size Changer",
                method: () => {
                    const transform = getTransform(GTPlayer);
                    let scale = transform.method("get_localScale").invoke();
                    if (rightTrigger) {
                        scale = Vector3.method("op_Addition").invoke(scale, [0.05, 0.05, 0.05]);
                    }
                    if (leftTrigger) {
                        scale = Vector3.method("op_Subtraction").invoke(scale, [0.05, 0.05, 0.05]);
                    }
                    transform.method("set_localScale").invoke(scale);
                },
                disableMethod: () => {
                    getTransform(GTPlayer).method("set_localScale").invoke(Vector3.field("oneVector").value);
                },
            }),
            new ButtonInfo({
                buttonText: "Teleport Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const gunPointer = gunData.gunPointer;

                        if (rightTrigger && !perviousTeleportKey) {
                            teleportPlayer(getTransform(gunPointer).method("get_position").invoke())
                            rigidbody.method("set_velocity").invoke(zeroVector);
                        }

                        perviousTeleportKey = rightTrigger;
                    }
                },
            }),
            new ButtonInfo({
                buttonText: "Fly",
                method: () => {
                    if (rightPrimary) {
                        rigidbody.method("set_velocity").invoke(Vector3.field("zeroVector").value);

                        const transform = getTransform(GTPlayer);
                        let forward = getTransform(headCollider).method("get_forward").invoke();

                        let position = transform.method("get_position").invoke();
                        forward = Vector3.method("op_Multiply", 2).invoke(forward, 25.0 * deltaTime);

                        position = Vector3.method("op_Addition", 2).invoke(position, forward);

                        transform.method("set_position").invoke(position);
                    }
                },
                toolTip: "Lets you fly around while holding A."
            }),
            new ButtonInfo({
                buttonText: "Iron Man",
                method: () => {
                    if (leftPrimary) {
                        const leftRightVector = leftHandTransform.method("get_right").invoke();
                        const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, -15.0 * deltaTime);
                        rigidbody.method("AddForce", 2).invoke(leftForce, 2);
                    }
                    if (rightPrimary) {
                        const leftRightVector = rightHandTransform.method("get_right").invoke();
                        const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, 15.0 * deltaTime);
                        rigidbody.method("AddForce", 2).invoke(leftForce, 2);
                    }
                },
                toolTip: "Turns you into iron man. Use A and X to fly."
            }),

            new ButtonInfo({
                buttonText: "Noclip",
                method: () => {
                    if (rightTrigger && !previousNoclipKey) {
                        toggleColliders(false);
                    }

                    if (!rightTrigger && previousNoclipKey) {
                        toggleColliders(true);
                    }

                    previousNoclipKey = rightTrigger;
                },
                toolTip: "Lets you clip through objects while holding right trigger."
            }),
        ],
        [ // Advantage Mods [5]
            new ButtonInfo({
                buttonText: "Exit Rig Mods",
                method: () => currentCategory = 0,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Laggy Rig",
                method: () => {
                    PhotonNetwork.method("set_SendRate").invoke(5);
                    PhotonNetwork.method("set_SerializationRate").invoke(2);
                },
                disableMethod: () => {
                    PhotonNetwork.method("set_SendRate").invoke(60);
                    PhotonNetwork.method("set_SerializationRate").invoke(30);
                },
            }),
             new ButtonInfo({
                 buttonText: "Invis Monke",
                 method: () => {
                  if (!rightPrimary) return;
                  const now = Date.now();
                  if (now - lastToggle < cooldown) return;
                  lastToggle = now;

                  if (!ghostActive) {
                      const player = PhotonNetwork.method("get_LocalPlayer").invoke();
                      PhotonNetwork.method("DestroyPlayerObjects").invoke(player);
                      ghostActive = true;
                  } else {
                      PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Player"), getTransform(GTPlayer).method("get_position").invoke(), identityQuaternion, 0, NULL)
                      ghostActive = false;
                  }
               },
            }),
            new ButtonInfo({
                buttonText: "Bright Red Colour",
                method: () => {
                    const col = manager.field("Colour")?.value;
                    col.field("r").value = 5.0;
                    col.field("g").value = 0.0;
                    col.field("b").value = 0.0;
                    col.field("a").value = 1.0;
                },
                isTogglable: false,
            }),
            new ButtonInfo({
                buttonText: "Bright Green Colour",
                method: () => {
                    const col = manager.field("Colour")?.value;
                    col.field("r").value = 0.0;
                    col.field("g").value = 5.0;
                    col.field("b").value = 0.0;
                    col.field("a").value = 1.0;
                },
                isTogglable: false,
            }),
            new ButtonInfo({
                buttonText: "Bright Blue Colour",
                method: () => {
                    const col = manager.field("Colour")?.value;
                    col.field("r").value = 0.0;
                    col.field("g").value = 0.0;
                    col.field("b").value = 5.0;
                    col.field("a").value = 1.0;
                },
                isTogglable: false,
            }),
            new ButtonInfo({
                buttonText: "Bright White Colour",
                method: () => {
                    const col = manager.field("Colour")?.value;
                    col.field("r").value = 5.0;
                    col.field("g").value = 5.0;
                    col.field("b").value = 5.0;
                    col.field("a").value = 1.0;
                },
                isTogglable: false,
            }),
        ],

        [ // OP Mods [4]
            new ButtonInfo({
                buttonText: "Exit OP Mods",
                method: () => currentCategory = 0,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Set Master",
                isTogglable: false,
                method: () => PhotonNetwork.method("SetMasterClientOnPhoton").invoke(PhotonNetwork.method("get_LocalPlayer").invoke()),
            }),
            new ButtonInfo({
                buttonText: "Destroy All",
                isTogglable: false,
                method: () => {
                    PhotonNetwork.method("SetMasterClientOnPhoton").invoke(PhotonNetwork.method("get_LocalPlayer").invoke());
                    PhotonNetwork.method("DestroyAll").invoke();
                },
            }),
            new ButtonInfo({
                buttonText: "Destroy Others",
                isTogglable: false,
                method: () => {
                    PhotonNetwork.method("SetMasterClientOnPhoton").invoke(PhotonNetwork.method("get_LocalPlayer").invoke());
                    PhotonNetwork.method("DestroyAll").invoke();
                    PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Player"), getTransform(GTPlayer).method("get_position").invoke(), identityQuaternion, 0, NULL)
                },
            }),
            new ButtonInfo({
                buttonText: "255 Player Lobby [W?]",
                isTogglable: false,
                method: () => {
                    const room = PhotonNetwork.method("get_CurrentRoomOnPhoton").invoke();
                    room.field("maxPlayers").value = 255;
                },
            }),
            new ButtonInfo({
                buttonText: "Set Room Private [W?]",
                isTogglable: false,
                method: () => {
                    const room = PhotonNetwork.method("get_CurrentRoomOnPhoton").invoke();
                    room.field("IsVisible").value = false;
                    room.field("IsOpen").value = false;
                }
            }),
            new ButtonInfo({
                buttonText: "Set Room Public [W?]",
                isTogglable: false,
                method: () => {
                    const room = PhotonNetwork.method("get_CurrentRoomOnPhoton").invoke();
                    room.field("IsVisible").value = true;
                    room.field("IsOpen").value = true;
                }
            }),
            new ButtonInfo({
                buttonText: "Anti Kick",
                enabled: false,
                isTogglable: false,
                method: () => { GTPlayerClass.method("Kick").implementation = function () { }; },
            }),

            new ButtonInfo({
                buttonText: "Anti Quit",
                enabled: false,
                isTogglable: false,
                method: () => { GTPlayerClass.method("Quit").implementation = function () { }; },
            }),

            new ButtonInfo({
                buttonText: "Trusted User",
                isTogglable: false,
                method: () => GameData.field("instance").value.method("_setTrustedUser").invoke(),
            }),

            new ButtonInfo({
                buttonText: "Supporter",
                isTogglable: false,
                method: () => GameData.field("instance").value.method("_setSupporter").invoke(),
            }),
            new ButtonInfo({
                buttonText: "Rig/Lag Gun",
                method: () => {
                    if (rightGrab) {
                        const gunData = renderGun();
                        const gunPointer = gunData.gunPointer;

                        if (rightTrigger) {
                            const pos = getTransform(gunPointer).method("get_position").invoke()
                            PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Player"), pos, identityQuaternion, 0, NULL)
                            sendAllOutgoing()
                        };;
                    }
                },
                toolTip: "Lets You Lag And Spam Rigs"
            }),
            new ButtonInfo({
                buttonText: "Get Mod",
                isTogglable: true,
                method: () => {
                    const instance = GameData.field("instance").value;
                    instance.field("moderatorVentEntrance").value.method("set_enabled").invoke(false);
                    const modObjects = instance.field("enableWhenMod").value;
                    for (let i = 0; i < modObjects.length; i++) {
                        modObjects[i]?.method("SetActive").invoke(true);
                    }
                    const allPowersGO = instance.field("allPowers").value.method("get_gameObject").invoke();
                    allPowersGO.method("SetActive").invoke(true);
                    instance.field("moderatorVentsTrigger").value.method("SetActive").invoke(true);
                },
            }),
            new ButtonInfo({
                buttonText: "Free Cosmetics",
                method: () => {
                    AssemblyCSharp.class("CheckoutButton").field("instance").value.field("finalPrice").value = 0;
                },
            }),
        ],
    ];

    let buttonMap: Map<string, ButtonInfo> = new Map();
    buttons.flat().forEach(button => {
        buttonMap.set(button.buttonText, button);
    });

    function getIndex(buttonText: string): ButtonInfo {
        return buttonMap.get(buttonText);
    }

    const ButtonActivation = SkinButton.method("OnTriggerEnter");

    ButtonActivation.implementation = function (collider) {
        const rawName = this.method("get_name").invoke().toString();

        if (rawName.length > 1 && rawName[1] === "@") {
            if (collider.handle.equals(referenceCollider.handle)) {
                const goName = rawName.substring(2, rawName.length - 1);
                const _time = Time.method("get_time").invoke();

                if (_time > buttonClickDelay) {
                    buttonClickDelay = _time + 0.2;

                    const button = getIndex(goName);
                    if (button) {
                        if (button.isTogglable) {
                            button.enabled = !button.enabled;

                            if (button.enabled) {
                                sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                                button.enableMethod?.();
                            } else {
                                sendNotification("<color=grey>[</color><color=red>DISABLE</color><color=grey>]</color> " + button.toolTip, false);
                                button.disableMethod?.();
                            }
                        } else {
                            sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                            button.method?.();
                        }

                        reloadMenu();
                    }
                }
            }

            return;
        }
        return this.method("OnTriggerEnter").invoke(collider);
    };



    const LateUpdate = GTPlayer.method("Update");

    LateUpdate.implementation = function () {
        deltaTime = Time.method("get_deltaTime").invoke();
        time = Time.method("get_time").invoke();

        const Button = (fieldName: string) => {
            const field: any = AssemblyCSharp.class("GandysInputs").field(fieldName);
            if (!field || !ControllerInputPoller) return false;

            try {
                return field.isStatic ? !!field.value : !!field.value(ControllerInputPoller);
            } catch {
                return false;
            }
        };

        leftPrimary = Button("ButtonX");
        leftSecondary = Button("ButtonY");
        rightPrimary = Button("ButtonB");
        rightSecondary = Button("ButtonA");

        leftGrab = Button("LeftGrip");
        rightGrab = Button("RightGrip");

        leftTrigger = Button("LeftTrigger");
        rightTrigger = Button("RightTrigger");


        if (leftSecondary) {
            if (currentNotification != "" && time > notifactionResetTime)
                reloadMenu();

            if (menu == null) {
                renderMenu();
            } else {
                recenterMenu();
            }
        } else {
            if (menu != null) {
                Destroy(menu);
                menu = null;
            }
        } 

        // --- Reference object handling ---
        if (menu == null) {
            if (reference != null) {
                Destroy(reference);
                reference = null;
            }
        } else {
            if (reference == null) {
                renderReference();
            }
        }

        try {
            if (GunPointer != null) {
                if (!(GunPointer.method("get_activeSelf").invoke())) {
                    Destroy(GunPointer);
                    GunPointer = null;
                }
                else
                    GunPointer.method("SetActive").invoke(false);
            }

            let lineObj = GunLine.method("get_gameObject").invoke();
            if (lineObj != null) {
                if (!(lineObj.method("get_activeSelf").invoke())) {
                    Destroy(lineObj);
                    GunLine = null;
                }
                else
                    lineObj.method("SetActive").invoke(false);
            }
        } catch { }

        buttons.flat()
            .filter(button => button.enabled)
            .forEach(button => {
                if (button.method) {
                    try {
                        button.method();
                    } catch (error) {
                        console.error(`Error executing method for button '${button.buttonText || 'unnamed'}':`, error);
                        console.error('Error stack:', error.stack);
                        console.error('Button object:', button);

                        if (error.stack) {
                            const stackLines = error.stack.split('\n');
                            if (stackLines.length > 1) {
                                console.error('Error occurred at:', stackLines[1].trim());
                            }
                        }
                    }
                }
            });

        return LateUpdate.invoke();
    };

    console.log(`

     ••╹   ┏┓     • ┓  ┳┳┓      
     ┓┓ ┏  ┗┓╋┓┏┏┓┓┏┫  ┃┃┃┏┓┏┓┓┏
     ┗┗ ┛  ┗┛┗┗┻┣┛┗┗┻  ┛ ┗┗ ┛┗┗┻
                ┛               
    ii's Stupid Menu Quest 1.1.0
    Compiled ${new Date().toISOString()}
`);

}, "main");