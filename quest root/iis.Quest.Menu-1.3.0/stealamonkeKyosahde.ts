// ii's Quest Menu, by @goldentrophy / @crimsoncauldron
// Warning: Ugly code. I hate TypeScript.

declare const Il2Cpp: any;
declare const console: any;
declare const System: any;
declare const XRNode: any;
declare const Random: any;

let flingstrength = 50.0;

let RebirthManager = null

let annoycooldown = 1000
let annoy2cooldown = 250
let playerflingthing = null

let freerebirths = false

let playerindex = 0;

let fling = null;

let brainrotlist = ["Bombardino_Crocodilo Variant", "Tralalero_Tralala Variant", "Geeble", "Brr_Brr_Patapim Variant", "Gorillini Tortellini", "Trippi_Troppi Variant", "Trulimero_Trulicina Variant", "Capachino_Assassino Variant", "Burbaloni_Loliloli Variant", "Ta_Ta_Ta_Ta_Sahur Variant", "Boneca_Ambalabu Variant", "Tung_Tung_Tung_Sahur Variant", "Cocofanto_Elefanto Variant", "Chef_Crabracadebra Variant", "Pibble", "Svinina_Bombardino Variant", "Tim_Cheese Variant", "Gangster_Footera Variant", "Lirili_Larila Variant", "Frigo_Camelo Variant", "John_Pork Variant"]
let brainrotindex = 0

let becomebrainrot = null

let brainrotfollow = false
let freezebrainrots = false
let brainrotfollowpos = null

let replacerandom = false;
let norandom = false;

let skyblack = false;
let blacksky = null;
let blacksky2 = null;
let blacksky3 = null;
let blacksky4 = null;


let lastRunTime = 0;
const strobecooldown = 1000;
const destroycooldown = 750;
const skyflashcooldown = 100

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

let leftPlatform = null;
let rightPlatform = null;

let lvT = null;
let rvT = null;

let buttonNotifications: boolean = true;

let bgColor: [number, number, number, number] = [0.0, 0.0, 0.0, 1.0];
let textColor: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0];

let buttonColor: [number, number, number, number] = [0.1, 0.1, 0.1, 1.0];
let buttonPressedColor: [number, number, number, number] = [0.4, 0.4, 0.4, 1.0];

let menuName: string = "Goose's <b>DUMBASS edited by Kyoshade</b> Menu ";
let currentNotification: string = "";
let notifactionResetTime: number = 0;
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

    const EasyInputs = AssemblyCSharp.class("easyInputs.EasyInputs");
    const BoxColliderClass = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const GTPlayerClass = AssemblyCSharp.class("GorillaLocomotion.Player");
    const GorillaReportButton = AssemblyCSharp.class("NormalButton");
    const PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork");
    const GTPlayer = GTPlayerClass.method("get_Instance").invoke();
    const PhotonNetworkController = AssemblyCSharp.class("MatchMaking.RoomConnectionStateMachine").field("instance").value;
    const BrainRotController = AssemblyCSharp.class("BrainRotController").field("Instance").value;

    const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
    const Component = UnityEngineCore.class("UnityEngine.Component");
    const Object = UnityEngineCore.class("UnityEngine.Object");
    const Transform = UnityEngineCore.class("UnityEngine.Transform");
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

    const NetworkPlayerSpawner = AssemblyCSharp.class("NetworkPlayerSpawner").field("Instance").value;
    const NetworkPlayerSpawnerClass = AssemblyCSharp.class("NetworkPlayerSpawner");
    const GorillaTagger = NetworkPlayerSpawner.method("get_Player").invoke();
    const rigidbody = GTPlayer.field("playerRigidBody").value;

    const UberShader = Shader.method("Find").invoke(Il2Cpp.string("Universal Render Pipeline/Lit"));
    const TextShader = Shader.method("Find").invoke(Il2Cpp.string("GUI/Text Shader"));

    const zeroVector = Vector3.field("zeroVector").value;
    const oneVector = Vector3.field("oneVector").value;
    const identityQuaternion = Quaternion.field("identityQuaternion").value;

    const leftHandTransform = GorillaTagger.field("leftHandTransform").value;
    const rightHandTransform = GorillaTagger.field("rightHandTransform").value;
    const headCollider = GorillaTagger.field("headCollider").value;
    const bodyCollider = GorillaTagger.field("bodyCollider").value;

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

    function vectorSubstraction(vector1: any, vector2: any) {
        return Vector3.method("op_Addition", 2).invoke(vector1, Vector3.method("op_Multiply").invoke(vector2, -1))
    }


    function setPlayerColor(color) {
        PlayerPrefs.method("SetFloat").invoke("redValue", color[0]);
        PlayerPrefs.method("SetFloat").invoke("greenValue", color[1]);
        PlayerPrefs.method("SetFloat").invoke("blueValue", color[2]);
        PlayerPrefs.method("Save").invoke();

        GorillaTagger.method("UpdateColor").invoke(color[0], color[1], color[2]);
        GorillaTagger.method("get_myVRRig").invoke().method("SendRPC").invoke(0, color);

    }

    function getTransform(obj: any) {
        return obj.method("get_transform").invoke();
    }

    function world2Player(position) {
        position = Vector3.method("op_Subtraction", 2).invoke(position, getTransform(bodyCollider).method("get_position").invoke());
        position = Vector3.method("op_Addition", 2).invoke(position, getTransform(GorillaTagger).method("get_position").invoke());
        return position;
    }

    function teleportPlayer(position) {
        GTPlayer.method("TeleportTo", 3).invoke(world2Player(position), getTransform(GTPlayer).method("get_rotation").invoke(), false);
    }

    function sendAllOutgoing() {
        PhotonNetwork.method("SendAllOutgoingCommands").invoke();
    }

    function serialize() {
        PhotonNetwork.method("RunViewUpdate").invoke();
    }

    function setMasterClient() {
        PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer").invoke());
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
        3
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

        addComponent(disconnectButton, GorillaReportButton);
        getComponent(disconnectButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "Disconnect", textColor, [0.11, 0, 0.225], [1, 0.1]);

        {
            const pageButton = createObject([0.1, 0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@PreviousPage"));

            addComponent(pageButton, GorillaReportButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, "<", textColor, [0.11, 0.2, 0], [1, 0.1]);
        }

        {
            const pageButton = createObject([0.1, -0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@NextPage"));

            addComponent(pageButton, GorillaReportButton);
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

            addComponent(button, GorillaReportButton);
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

    function playButtonSound() {
        //LocalRig.method("PlayHandTapLocal").invoke(8, false, 0.3 );
        //GorillaTagger.method("StartVibration").invoke(false, 0.5, 0.075);
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
                buttonText: "Fun Mods",
                method: () => currentCategory = 4,
                isTogglable: false,
                toolTip: "Opens the fun category."
            }),

            new ButtonInfo({
                buttonText: "Rig Mods",
                method: () => currentCategory = 5,
                isTogglable: false,
                toolTip: "Opens the fun category."
            }),
            new ButtonInfo({
                buttonText: "Spawner Mods",
                method: () => currentCategory = 7,
                isTogglable: false,
                toolTip: "Opens the fun category."
            }),
            new ButtonInfo({
                buttonText: "Overpowered Mods",
                method: () => currentCategory = 6,
                isTogglable: false,
                toolTip: "Opens the advantage category."
            }),
            new ButtonInfo({
                buttonText: "VFX Spawners",
                method: () => currentCategory = 9,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Sound Spawners",
                method: () => currentCategory = 10,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Rig Spawners",
                method: () => currentCategory = 11,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Monster Spawners",
                method: () => currentCategory = 12,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Item Spawners",
                method: () => currentCategory = 13,
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
        ],

    [ // Hidden [1]
      new ButtonInfo({
        buttonText: "Disconnect",
        method: () => PhotonNetwork.method("Disconnect").invoke(),
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
        buttonText: "Switch brainrot",
        method: () => {
          brainrotindex++;
          brainrotindex %= brainrotlist.length;
          sendNotification(brainrotlist[brainrotindex] + ` [${brainrotindex}]`)
        },
        isTogglable: false,
        toolTip: "Changes the theme of the menu."
      }),
      new ButtonInfo({
        buttonText: "+ 25 fling power",
        method: () => {
          flingstrength +=  25;
          sendNotification(`New fling power ${flingstrength}`)
        },
        isTogglable: false,
        toolTip: "Changes the theme of the menu."
      }),
      new ButtonInfo({
        buttonText: "- 25 fling power",
        method: () => {
          flingstrength = flingstrength -= 25;
          sendNotification(`New fling power ${flingstrength}`)
        },
        isTogglable: false,
        toolTip: "Changes the theme of the menu."
      }),
      new ButtonInfo({
        buttonText: "Freeze Player in Menu",
        enabled: false,
        method: () => {
          if (menu != null)
          {
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
      new ButtonInfo({
        buttonText: "Unfinished/Dev Mods",
        method: () => currentCategory = 8,
        isTogglable: false,
        toolTip: "Opens the fun category."
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
        buttonText: "Platforms",
        method: () => {
          if (leftGrab){
            if (leftPlatform == null){
              const handTransform = leftHandTransform;
              leftPlatform = createObject(Vector3.method("op_Addition", 2).invoke(handTransform.method("get_position").invoke(), [0.0, -0.035, 0.0]), handTransform.method("get_rotation").invoke(), [0.035, 0.15, 0.35], 3, bgColor);
            }
          } else {
            if (leftPlatform != null){
              Destroy(leftPlatform);
              leftPlatform = null;
            }
          }

          if (rightGrab){
            if (rightPlatform == null){
              const handTransform = rightHandTransform;
              rightPlatform = createObject(Vector3.method("op_Addition", 2).invoke(handTransform.method("get_position").invoke(), [0.0, -0.035, 0.0]), handTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2], 3, bgColor);
            }
          } else {
            if (rightPlatform != null){
              Destroy(rightPlatform);
              rightPlatform = null;
            }
          }
        },
        toolTip: "Spawns platforms when pressing grip."
      }),
      new ButtonInfo({
        buttonText: "Iron Man",
        method: () => {
           if (leftPrimary){
            const leftRightVector = leftHandTransform.method("get_right").invoke();
            const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, -15.0 * deltaTime);
            rigidbody.method("AddForce", 2).invoke(leftForce, 2);
          }
          if (rightPrimary){
            const leftRightVector = rightHandTransform.method("get_right").invoke();
            const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, 15.0 * deltaTime);
            rigidbody.method("AddForce", 2).invoke(leftForce, 2);
          }
        },
        toolTip: "Turns you into iron man. Use A and X to fly."
      }),
      new ButtonInfo({
        buttonText: "Fly",
        method: () => {
          if (rightPrimary){
            const leftRightVector = rightHandTransform.method("get_forward").invoke();
            const leftForce = Vector3.method("op_Multiply", 2).invoke(leftRightVector, 20.0);
            rigidbody.method("set_velocity").invoke(leftForce); 
          }
        },
        toolTip: "Fly"
      }),

      new ButtonInfo({
        buttonText: "Noclip",
        method: () => {
          if (rightTrigger && !previousNoclipKey){
            toggleColliders(false);
          }

          if (!rightTrigger && previousNoclipKey){
            toggleColliders(true);
          }

          previousNoclipKey = rightTrigger;
        },
        toolTip: "Lets you clip through objects while holding right trigger."
      }),
    ],

    [ // Fun Mods [4]
      new ButtonInfo({
        buttonText: "Exit Fun Mods",
        method: () => currentCategory = 0,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Spawner Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string(brainrotlist[brainrotindex]), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Buy all",
        method: () => {
          const brainrotList = AssemblyCSharp.class("BrainRotCharacter").field("Characters").value
          for (let i = 0; i < brainrotList.method("get_Count").invoke(); i++) {
            const character = brainrotList.method("get_Item").invoke(i);
            character.method("Purchase").invoke()
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Sell all (Self)",
        method: () => {
          const slotslist = AssemblyCSharp.class("BrainRotCharacterSlot").field("AllSlots").value
          for (let i = 0; i < slotslist.method("get_Count").invoke(); i++) {
            const slot = slotslist.method("get_Item").invoke(i);
            slot.method("SellCharacter").invoke(true)
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Own all bases",
        method: () => {
          const bases = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("BrainRotBase")).invoke();
          for (let i = 0; i < bases.length; i++) {
            const currentbase = bases.get(i)
            currentbase.method("SetBaseOwnerRPC").invoke(PhotonNetwork.method("get_LocalPlayer").invoke().method("get_ActorNumber").invoke())
currentbase.method("UpdateOwnerNameText").invoke()
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Unlock everyone's base",
        method: () => {
          const bases = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("BrainRotBase")).invoke();
          for (let i = 0; i < bases.length; i++) {
            const currentbase = bases.get(i)
            currentbase.method("LockDoorRPC").invoke(false, 1)
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Lock everyone's base",
        method: () => {
          const bases = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("BrainRotBase")).invoke();
          for (let i = 0; i < bases.length; i++) {
            const currentbase = bases.get(i)
            currentbase.method("LockDoorRPC").invoke(true, 999999)
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Give self 1 billion",
        method: () => {
          AssemblyCSharp.class("BrainRotController").field("PlayerBase").value.method("EarnMoney").invoke(1000000000)
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
        new ButtonInfo({
            buttonText: "Give self A LOT billion",
            method: () => {
                AssemblyCSharp.class("BrainRotController").field("PlayerBase").value.method("EarnMoney").invoke(1000000000000000000000)
            },
            isTogglable: false,
            toolTip: "Destroys everyone."
        }),
      new ButtonInfo({
        buttonText: "Lock self base forever",
        method: () => {
          AssemblyCSharp.class("BrainRotController").field("PlayerBase").value.method("LockDoorRPC").invoke(true, 1000000)
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "unlock self base",
        method: () => {
          AssemblyCSharp.class("BrainRotController").field("PlayerBase").value.method("LockDoorRPC").invoke(true, 0)
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Brainrot follow gun",
        method: () => {
          if (rightGrab) {
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
              const brainrotfollowpos = getTransform(gunPointer).method("get_position").invoke()
              const characterslist = AssemblyCSharp.class("BrainRotCharacter").field("Characters").value
              for (let i = 0; i < characterslist.method("get_Count").invoke(); i++) {
                const character = characterslist.method("get_Item").invoke(i);
                character.method("FollowPoint").invoke(brainrotfollowpos)
              }
              
            }
            perviousTeleportKey == rightTrigger
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Character TP Gun",
        method: () => {
          if (rightGrab) {
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
              const pos = getTransform(gunPointer).method("get_position").invoke()
              const brainrotList = AssemblyCSharp.class("BrainRotCharacter").field("Characters").value
              for (let i = 0; i < brainrotList.method("get_Count").invoke(); i++) {
                const character = brainrotList.method("get_Item").invoke(i);
                getTransform(character).method("set_position").invoke(pos)
              }
            }
            perviousTeleportKey == rightTrigger
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "replace characters",
        method: () => {
          replacerandom = true;
        },
        disableMethod: () => {
          replacerandom = false;
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "no characters",
        method: () => {
          norandom = true;
        },
        disableMethod: () => {
          norandom = false;
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Rare Character spam",
        method: () => {
          BrainRotController.method("SpawnCharacter").invoke(Il2Cpp.string(brainrotlist[brainrotindex]))
        },
        toolTip: "Spawns a hoverboard where your gun aims."
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
        buttonText: "RGB rig",
        method: () => {
    const now = Date.now();
    if (now - lastRunTime >= strobecooldown) {
        lastRunTime = now;
          NetworkPlayerSpawnerClass.method("SetColor").invoke([Math.random(), Math.random(), Math.random(), 1.0])
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Black color",
        method: () => {
    const now = Date.now();
    if (now - lastRunTime >= strobecooldown) {
        lastRunTime = now;
          NetworkPlayerSpawnerClass.method("SetColor").invoke([-50.0, -50.0, -50.0, 1.0])
}
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Discord ad Name",
        method: () => {
if (PhotonNetwork.method("get_NickName").invoke() != "<size=13><color=red>discord.gg/gcCYhmHD9T\nBEST FREE MODS</color></size>") {
          PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string("<size=13><color=red>discord.gg/gcCYhmHD9T\nBEST FREE MODS</color></size>"))
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "GOOSE WAS HERE Name",
        method: () => {
if (PhotonNetwork.method("get_NickName").invoke() != "<size=45><color=red>GOOSE\n\nWAS\n\nHERE</color></size>") {
          PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string("<size=45><color=red>GOOSE\n\nWAS\n\nHERE</color></size>"))
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
        new ButtonInfo({
            buttonText: "KyoshadeName",
            method: () => {
                if (PhotonNetwork.method("get_NickName").invoke() != "<size=45><color=cyan>KYOSHADE\n</color></size>") {
                    PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string("<size=45><color=cyan>GOOSE\n\nWAS\n\nHERE</color></size>"))
                }
            },
            isTogglable: true,
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
      new ButtonInfo({
        buttonText: "No Name",
        method: () => {
if (PhotonNetwork.method("get_NickName").invoke() != "") {
          PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string(""))
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Scary Baboon Rig",
        method: () => {
PhotonNetwork.method("DestroyPlayerObjects").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonNetworkPlayer_SquidGame"), [0.0, 0.0, 0.0], identityQuaternion, 0, NULL)
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Scary Baboon Rig (Grappler)",
        method: () => {
PhotonNetwork.method("DestroyPlayerObjects").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonNetworkPlayer fromMain"), [0.0, 0.0, 0.0], identityQuaternion, 0, NULL)
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "No Rig",
        method: () => {
PhotonNetwork.method("DestroyPlayerObjects").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
    ],

    [ // OP Mods [6]
      new ButtonInfo({
        buttonText: "Exit OP Mods",
        method: () => currentCategory = 0,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Set masterclient",
        method: () => {
PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
},
        isTogglable: false,
        toolTip: "Sets you as master client."
      }),
      new ButtonInfo({
        buttonText: "auto masterclient",
        method: () => {
if (PhotonNetwork.method("get_InRoom").invoke() && !PhotonNetwork.method("get_IsMasterClient").invoke()) {
PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
}
},
        isTogglable: true,
        toolTip: "Sets you as master client."
      }),
      new ButtonInfo({
        buttonText: "Destroy brainrots",
        method: () => {
          const brainrotList = AssemblyCSharp.class("BrainRotCharacter").field("Characters").value
          for (let i = 0; i < brainrotList.method("get_Count").invoke(); i++) {
            const character = brainrotList.method("get_Item").invoke(i);
            console.log(character)
            BrainRotController.method("DespawnCharacter").invoke(character)
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
      new ButtonInfo({
        buttonText: "Crash All",
        method: () => {
            for (let i = 0; i < 1000; i++) {
          const thingforlag = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BearTrap"), [100.0, -100.0, 0.0], identityQuaternion, 0, NULL)
          Destroy(thingforlag)
}
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Lag Spike All",
        method: () => {
            for (let i = 0; i < 400; i++) {
          const thingforlag = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BearTrap"), [100.0, -100.0, 0.0], identityQuaternion, 0, NULL)
          Destroy(thingforlag)
sendAllOutgoing()
}
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Force field",
        method: () => {
          const players = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("NetworkPlayer")).invoke();
          for (let i = 0; i < players.length; i++) {
              const playerthingylol = players.get(i);
              if (Vector3.method("Distance").invoke(getTransform(headCollider).method("get_position").invoke(), playerthingylol.field("head").value.method("get_position").invoke()) < 4.0 && !playerthingylol.field("nameText").value.method("get_text").invoke().toString().includes(PhotonNetwork.method("get_NickName").invoke())) {
playerthingylol.method("PushBack").invoke(vectorSubstraction(getTransform(headCollider).method("get_position").invoke(), playerthingylol.field("head").value.method("get_position").invoke()), -1.7)
}
          }
sendAllOutgoing()
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Fling all",
        method: () => {
          const players = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("NetworkPlayer")).invoke();
          for (let i = 0; i < players.length; i++) {
              const playerthingylol = players.get(i);
              if (!playerthingylol.field("nameText").value.method("get_text").invoke().toString().includes(PhotonNetwork.method("get_NickName").invoke())) {
playerthingylol.method("PushBack").invoke([0.0, 1.0, 0.0], flingstrength)
}
          }
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Annoy all",
        method: () => {
    const now = Date.now();
    if (now - lastRunTime >= annoycooldown) {
        lastRunTime = now;
          const players = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("NetworkPlayer")).invoke();
          for (let i = 0; i < players.length; i++) {
              const playerthingylol = players.get(i);
              if (!playerthingylol.field("nameText").value.method("get_text").invoke().toString().includes(PhotonNetwork.method("get_NickName").invoke())) {
playerthingylol.method("PushBack").invoke([Math.random() - 0.5, 1, Math.random() - 0.5], 10)

}
          }
sendAllOutgoing()
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Invisible All",
        method: () => {
          PhotonNetwork.method("DestroyAll").invoke()
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Annoy Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const ray = gunData.ray;
            if (rightTrigger && !gunLocked){
const raything = ray
  gunLocked = true;
try {
              const gunTarget = getComponentInParent(raything.method("get_collider").invoke(), AssemblyCSharp.class("NetworkPlayer"));
  playerflingthing = gunTarget.method("PushBack")
  lockTarget = gunTarget.field("disableBodyObj").value;
} catch {
  gunLocked = false;
  lockTarget = null;
}
            }
          }
if (gunLocked) {
    const now = Date.now();
    if (now - lastRunTime >= annoycooldown) {
        lastRunTime = now;
playerflingthing.invoke([Math.random() - 0.5, 1, Math.random() - 0.5], 10)
}
}
if (!rightTrigger) {
  gunLocked = false;
  lockTarget = null;
}
        },
        isTogglable: true,
        toolTip: "Tags whoever your hand desires."
      }),
      new ButtonInfo({
        buttonText: "Fling Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const ray = gunData.ray;

            if (rightTrigger){
try {
              const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), AssemblyCSharp.class("NetworkPlayer"));
              gunTarget.method("PushBack").invoke([0.0, 1, 0.0], flingstrength)
} catch {}
            }
          }
        },
        isTogglable: true,
        toolTip: "Tags whoever your hand desires."
      }),
      new ButtonInfo({
        buttonText: "Bring Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const ray = gunData.ray;

            if (rightTrigger){
try {
              const gunTarget = getComponentInParent(ray.method("get_collider").invoke(), AssemblyCSharp.class("NetworkPlayer"));
              gunTarget.method("PushBack").invoke(vectorSubstraction(vectorSubstraction(getTransform(headCollider).method("get_position").invoke(), gunTarget.field("head").value.method("get_position").invoke()), [0.0, 15.0, 0.0]), 1.7)
} catch {}
            }
          }
        },
        isTogglable: true,
        toolTip: "Tags whoever your hand desires."
      }),
    ],
    [ // Spawner Mods [7]
      new ButtonInfo({
        buttonText: "Exit Spawner Mods",
        method: () => currentCategory = 0,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Item Spawners",
        method: () => currentCategory = 13,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
   ],
    [ // Test Mods [8]
      new ButtonInfo({
        buttonText: "Exit Dev Mods",
        method: () => currentCategory = 2,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Clear all bases",
        method: () => {
          const bases = Object.method("FindObjectsOfType").inflate(AssemblyCSharp.class("BrainRotBase")).invoke();
          for (let i = 0; i < bases.length; i++) {
            const currentbase = bases.get(i)
            currentbase.method("ClearBase").invoke()
          }
        },
        isTogglable: false,
        toolTip: "Destroys everyone."
      }),
    ],
    [ // VFX Mods [9]
      new ButtonInfo({
        buttonText: "Exit VFX Mods",
        method: () => currentCategory = 7,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Explosion Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BigExplosion"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
            perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Smite Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [2.0, 3.0, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Lighting"), pos, [0.707, 0.707, 0.0, 0.0], 0, NULL)
sendAllOutgoing()
          }
         }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }), 
      new ButtonInfo({
        buttonText: "Blood Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("pool/BloodFX"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
          }
         }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Blood Gun 2",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Hit"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
          }
         }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

    ],
    [ // Sound Mods [10]
      new ButtonInfo({
        buttonText: "Exit Sound Mods",
        method: () => currentCategory = 7,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Confetti Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Confetti"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
            perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Macarena Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("AMacrena"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Fein Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Fein"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "LadyHear Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("ladyhear"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "TylerTheCreator Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("TylerTheCreator"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Tect talking Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("TectAudio"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }), 
      new ButtonInfo({
        buttonText: "Splash Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Splash"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Bell Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("GameThing"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Plane Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("ImBoutaBombThisPlane"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
    ],
    [ // SFX Mods [4]
      new ButtonInfo({
        buttonText: "Exit Rig Spawn Mods",
        method: () => currentCategory = 7,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Random Scary Baboon Rigs",
        method: () => {
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonNet"), [Math.random() * 20 - 10, Math.random() * 50, Math.random() * 60 - 30], identityQuaternion, 0, NULL)
sendAllOutgoing()
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Rig Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.5, 0.0])
const rig = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("MonkeNetworkPlayer"), pos, identityQuaternion, 0, NULL)
rig.method("set_enabled").invoke(false)
     
sendAllOutgoing()
            };;
          }
perviousTeleportKey = rightTrigger;
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Scary Baboon Rig Gun (Health)",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.5, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonFighterNetwork"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Scary Baboon Rig Gun (Miner)",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.5, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonMiner"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Scary Baboon Rig Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.5, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonNet"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Ragdoll Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("RagdollV2"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Ragdoll explode Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
            for (let i = 0; i < 15; i++) {
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("RagdollV2"), pos, identityQuaternion, 0, NULL)
            }
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Hammer Rig Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BaboonFling"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
    ],
    [ // SFX Mods [4]
      new ButtonInfo({
        buttonText: "Exit Monster Mods",
        method: () => currentCategory = 7,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "BigLarry Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("monsters/BigLarry"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "MeatMan Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("monsters/MeatMan"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
    ],
    [ // item guns [4]
      new ButtonInfo({
        buttonText: "Exit Item Mods",
        method: () => currentCategory = 7,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Bear Trap Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.1, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BearTrap"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Bear Trap Spam Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.05, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BearTrapGround"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),

      new ButtonInfo({
        buttonText: "Spring Trap Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = Vector3.method("op_Addition", 2).invoke(getTransform(gunPointer).method("get_position").invoke(), [0.0, 0.1, 0.0])
PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("SpringTrap"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
perviousTeleportKey = rightTrigger;
          }
        },
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
        new ButtonInfo({
            buttonText: "Jman Block Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("JmanCurly"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Semen Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BubbleSpwan"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Basket ball Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("BasketBallInteractable"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Earrape",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Bring"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Ghost Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("PurpleGhostJump"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Ragdoll V1 Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Ragdoll"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
        }),
        new ButtonInfo({
            buttonText: "Storm Gun",
            method: () => {
                if (rightGrab) {
                    const gunData = renderGun();
                    const gunPointer = gunData.gunPointer;

                    if (rightTrigger) {
                        const pos = getTransform(gunPointer).method("get_position").invoke()
                        PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Storm4"), pos, identityQuaternion, 0, NULL)
                        sendAllOutgoing()
                    }
                }
            },
            toolTip: "Spawns a hoverboard where your gun aims."
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

//AssemblyCSharp.class("BrainRotBase").method("LockDoorRPC").implementation = function (e) {
//  return;
//}

BrainRotController.method("SpawnRandomCharacterOnTrack").implementation = function () {
  if (replacerandom) {
  BrainRotController.method("SpawnCharacter").invoke(Il2Cpp.string(brainrotlist[brainrotindex]))
} else {
  if (norandom) {
return;
} else {
BrainRotController.method("SpawnRandomCharacterOnTrack").invoke()
}
}
}

AssemblyCSharp.class("RebirthManager").method("OnPlayerMoneyChanged").implementation = function (e) {
  RebirthManager = this
  this.method("OnPlayerMoneyChanged").invoke(e)
}

AssemblyCSharp.class("RebirthManager").method("ResetPlayerProgress").implementation = function () {
  return;
}

AssemblyCSharp.class("RebirthManager").method("CanRebirth").implementation = function () {
  return true;
}

  const ButtonActivation = GorillaReportButton.method("OnTriggerEnter");
  ButtonActivation.implementation = function (collider) {
    const rawName = this.method("get_name").invoke().toString();

    if (rawName.length > 1 && rawName[1] == "@"){
      if (collider.handle.equals(referenceCollider.handle)){
        const goName = rawName.substring(2, rawName.length - 1);
        const _time = Time.method("get_time").invoke();
        
        if (_time > buttonClickDelay){
          buttonClickDelay = _time + 0.2;

          const button = getIndex(goName)
          if (button) {
            if (button.isTogglable){
              button.enabled = !button.enabled;

              if (button?.enabled) {
                button.enableMethod?.();
              } else {
                button?.disableMethod?.();
              }

            } else{
              button?.method?.();
            }
            
            reloadMenu();
            playButtonSound();
          }
        }
      }

      return;
    }

    return this.method("OnTriggerEnter").invoke(collider);
  };

  const LateUpdate = GTPlayer.method("LateUpdate");

  LateUpdate.implementation = function () {
    leftPrimary = EasyInputs.method("GetPrimaryButtonDown").invoke(0)
    leftSecondary = EasyInputs.method("GetSecondaryButtonDown").invoke(0);

    rightPrimary = EasyInputs.method("GetPrimaryButtonDown").invoke(1);
    rightSecondary = EasyInputs.method("GetSecondaryButtonDown").invoke(1);

    leftGrab = EasyInputs.method("GetGripButtonDown").invoke(0);
    rightGrab = EasyInputs.method("GetGripButtonDown").invoke(1);

    leftTrigger = EasyInputs.method("GetTriggerButtonFloat").invoke(0) > 0.5;
    rightTrigger = EasyInputs.method("GetTriggerButtonFloat").invoke(1) > 0.5;

    deltaTime = Time.method("get_deltaTime").invoke();
    time = Time.method("get_time").invoke();

    if (leftSecondary)
    {
      if (currentNotification != "" && time > notifactionResetTime)
        reloadMenu();

      if (menu == null)
      {
        renderMenu();
      } else {
        recenterMenu();
      }
    } else {
      if (menu != null){
        Destroy(menu);
        menu = null;
      }
    } 

    if (menu == null){
      if (reference != null){
        Destroy(reference);
        reference = null;
      }
    } else {
      if (reference == null){
        renderReference();
      }
    }

    try {
      if (GunPointer != null){
        if (!(GunPointer.method("get_activeSelf").invoke())){
          Destroy(GunPointer);
          GunPointer = null;
        }
        else
          GunPointer.method("SetActive").invoke(false);
      }
      
      let lineObj = GunLine.method("get_gameObject").invoke();
      if (lineObj != null){
        if (!(lineObj.method("get_activeSelf").invoke())){
          Destroy(lineObj);
          GunLine = null;
        }
        else
          lineObj.method("SetActive").invoke(false);
      }
    } catch {}

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
    *********************8*SUCCESS*8*********************
  
  
  GOOSES DUMBASS MENU MADE BY IIDK MAIN MODS BY GOOSE AND EDITED BY KYOSHADE WITH PKP PERFABS
    
    ○( ＾皿＾)っ Hehehe…

    Compiled ${new Date().toISOString()}
`);

}, "main");