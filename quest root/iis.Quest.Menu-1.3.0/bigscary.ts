// ii's Quest Menu, by @goldentrophy / @crimsoncauldron
// Warning: Ugly code. I hate TypeScript.

declare const Il2Cpp: any;
declare const console: any;
declare const System: any;
declare const XRNode: any;
declare const Random: any;

let lastRunTime = 0;
const strobecooldown = 1000;

let THISFUCKINGPIECEOFSHITIHATEYOU = null

const destroycooldown = 250;

let invisible = false

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

let bgColor: [number, number, number, number] = [0.0, 0.0, 0.0, 1.0];
let textColor: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0];

let buttonColor: [number, number, number, number] = [0.1, 0.1, 0.1, 1.0];
let buttonPressedColor: [number, number, number, number] = [0.7, 0.7, 0.7, 1.0];

let menuName: string = "Goose's <b>DUMBASS</b> Menu ";
let themeIndex = 0;
class XRInputHandler {
  private InputDevices: any;
  private tryGetFeatureValue: any;
  private buttonStates: Map<string, boolean>;

  constructor() {
    this.InputDevices = Il2Cpp.domain
      .assembly("UnityEngine.XRModule")
      .image.class("UnityEngine.XR.InputDevices");

    this.tryGetFeatureValue = this.InputDevices.method("TryGetFeatureValue_bool", 3);
    this.buttonStates = new Map();
  }

  update() {
    this.updateControllerStates(1); // left controller
    this.updateControllerStates(2); // right controller
  }

  private updateControllerStates(controllerId: number) {
    const features = [
      "PrimaryButton",
      "SecondaryButton",
      "GripButton",
      "TriggerButton",
      "MenuButton"
    ];

    features.forEach(feature => {
      const key = `${controllerId}_${feature}`;
      this.buttonStates.set(key, this.getButtonState(controllerId, feature));
    });
  }

  private getButtonState(deviceId: number, featureName: string): boolean {
    try {
      const valuePtr = Il2Cpp.alloc(1);
      const feature = Il2Cpp.string(featureName);
      const success = this.tryGetFeatureValue.invoke(uint64(deviceId), feature, valuePtr);
      if (success) {
        return valuePtr.readU8() !== 0;
      }
    } catch (_) {}
    return false;
  }

  isButtonPressed(controllerId: number, feature: string): boolean {
    return this.buttonStates.get(`${controllerId}_${feature}`) || false;
  }

  // Renamed getters
  get leftControllerPrimaryButton(): boolean { return this.isButtonPressed(1, "PrimaryButton"); }
  get leftControllerSecondaryButton(): boolean { return this.isButtonPressed(1, "SecondaryButton"); }
  get rightControllerPrimaryButton(): boolean { return this.isButtonPressed(2, "PrimaryButton"); }
  get rightControllerSecondaryButton(): boolean { return this.isButtonPressed(2, "SecondaryButton"); }
  get leftGrab(): boolean { return this.isButtonPressed(1, "GripButton"); }
  get rightGrab(): boolean { return this.isButtonPressed(2, "GripButton"); }
  get leftControllerTriggerButton(): boolean { return this.isButtonPressed(1, "TriggerButton"); }
  get rightControllerTriggerButton(): boolean { return this.isButtonPressed(2, "TriggerButton"); }
  get controllerMenuButton(): boolean { 
    return this.isButtonPressed(1, "MenuButton") || this.isButtonPressed(2, "MenuButton"); 
  }
}

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

  const BoxColliderClass = UnityEnginePhysics.class("UnityEngine.BoxCollider");
  const GTPlayerClass = AssemblyCSharp.class("GorillaLocomotion.Player");
  const GorillaReportButton = AssemblyCSharp.class("Interaction.WorldButton");
  const PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork");
  const GTPlayer = GTPlayerClass.method("get_Instance").invoke();
  //const PhotonNetworkController = AssemblyCSharp.class("MatchMaking.RoomConnectionStateMachine").field("instance").value;

  const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
  const Object = UnityEngineCore.class("UnityEngine.Object");
  const Component = UnityEngineCore.class("UnityEngine.Component");
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

  const GorillaTagger = GTPlayer
  const rigidbody = GTPlayer.field("HIPOJJAKKPM").value;

  const UberShader = Shader.method("Find").invoke(Il2Cpp.string("Standard"));
  const TextShader = Shader.method("Find").invoke(Il2Cpp.string("GUI/Text Shader"));

  const zeroVector = Vector3.field("zeroVector").value;
  const oneVector = Vector3.field("oneVector").value;
  const identityQuaternion = Quaternion.field("identityQuaternion").value;

  const leftHandTransform = GorillaTagger.field("leftHandTransform").value;
  const rightHandTransform = GorillaTagger.field("rightHandTransform").value;
  const headCollider = GorillaTagger.field("headCollider").value;
  const bodyCollider = GorillaTagger.field("bodyCollider").value;

  const vAdd = Vector3.method("op_Addition", 2);
  const vMul = Vector3.method("op_Multiply", 2);
  const OVRInputHandler = new XRInputHandler();

  const arial = Resources
    .method("GetBuiltinResource", 1) 
    .inflate(Font)                   
    .invoke(Il2Cpp.string("Arial.ttf"));
   
  function Destroy(object){
    Object.method("Destroy", 1).invoke(object);
  }

function randomstring() {
    const length = Math.floor(Math.random() * 10)
    if (length != 0) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    } else {
    return "OZJFZJF";
   }
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
    if (returnType != null && returnType != undefined){
      return returnType
    }
    return addComponent(obj, type);
  }


  function setPlayerColor(color){
    PlayerPrefs.method("SetFloat").invoke("redValue", color[0]);
    PlayerPrefs.method("SetFloat").invoke("greenValue", color[1]);
    PlayerPrefs.method("SetFloat").invoke("blueValue", color[2]);
    PlayerPrefs.method("Save").invoke();

    GorillaTagger.method("UpdateColor").invoke(color[0], color[1], color[2]);
    GorillaTagger.method("get_myVRRig").invoke().method("SendRPC").invoke(0, color);
    
  }

  function getTransform(obj: any){
    return obj.method("get_transform").invoke();
  }

  function world2Player(position){
    position = Vector3.method("op_Subtraction", 2).invoke(position, getTransform(bodyCollider).method("get_position").invoke());
    position = Vector3.method("op_Addition", 2).invoke(position, getTransform(GorillaTagger).method("get_position").invoke());
    return position;
  }

  function teleportPlayer(position){
    GTPlayer.method("TeleportTo", 3).invoke(world2Player(position), getTransform(GTPlayer).method("get_rotation").invoke(), false);
  }

  function sendAllOutgoing(){
    PhotonNetwork.method("SendAllOutgoingCommands").invoke();
  }

  function serialize(){
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
  ){
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
    
    if (colorArr[3] == 0){
      renderer.method("set_enabled").invoke(false);
    } else {
      const material = renderer.method("get_material").invoke();
      material.method("set_shader").invoke(UberShader);
      material.method("set_color").invoke(colorArr); 
    }
    
    const transform = getTransform(obj); 
    if (parent != null){
      transform.method("SetParent", 2).invoke(parent, false);
    }

    transform.method("set_position").invoke(pos);
    transform.method("set_rotation").invoke(rot);
    transform.method("set_localScale").invoke(scale);

    return obj;
  }

  function renderMenu(){
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

  function renderReference(){
    reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.010], 0, bgColor, rightHandTransform)
    referenceCollider = getComponent(reference, Collider);

    getTransform(reference).method("set_localPosition").invoke([-0.025, -0.00, 0.125]);
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

    const hits =  Physics.method("RaycastAll", 4).invoke(
      rayStartPosition,  // origin (Vector3)
      Direction,         // direction (Vector3)
      512.0,            // maxDistance (float)
      layerMask         // layerMask (int)
    );

    let finalDistance = Infinity;
    let finalRay = null;
    for (const hit of hits){
      const distance = Vector3.method("Distance").invoke(hit.method("get_point").invoke(), StartPosition);
      if (distance < finalDistance){
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

  function recenterMenu(){
    let menuPosition = leftHandTransform.method("get_position").invoke();
    let menuRotation = leftHandTransform.method("get_rotation").invoke();
    
    menuRotation = Quaternion.method("op_Multiply", 2).invoke(menuRotation, Quaternion.method("Euler").invoke(-45, 0, 0))

    const menuTransform = getTransform(menu);
    menuTransform.method("set_position").invoke(menuPosition);
    menuTransform.method("set_rotation").invoke(menuRotation);
  }

  function reloadMenu(){
    if (menu != null){
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

  function playButtonSound(){
    //LocalRig.method("PlayHandTapLocal").invoke(8, false, 0.3 );
    //GorillaTagger.method("StartVibration").invoke(false, 0.5, 0.075);
  }

  function toggleColliders(enabled){
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
        buttonText: "Overpowered Mods",
        method: () => currentCategory = 6,
        isTogglable: false,
        toolTip: "Opens the advantage category."
      }),
    ],

    [ // Hidden [1]
      new ButtonInfo({
        buttonText: "Disconnect",
        method: () => PhotonNetwork.method("JoinRandomRoom"),
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
    ],

    [ // Movement Mods [3]
      new ButtonInfo({
        buttonText: "Exit Movement Mods",
        method: () => currentCategory = 0,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "No rig",
        method: () => {
              PhotonNetwork.method("DestroyPlayerObjects").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Turns you invisible when pressing B."
      }),
      new ButtonInfo({
        buttonText: "New rig",
        method: () => {
              PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("photonvr/OnlinePlayerRig"), getTransform(headCollider).method("get_position").invoke(), identityQuaternion, 0, NULL);
sendAllOutgoing()
        },
        isTogglable: false,
        toolTip: "Turns you invisible when pressing B."
      }),
      new ButtonInfo({
        buttonText: "Fly",
        method: () => {
          if (rightPrimary){
            rigidbody.method("set_velocity").invoke(Vector3.field("zeroVector").value);

            const transform = getTransform(GorillaTagger);
            let forward = getTransform(rightHandTransform).method("get_forward").invoke();

            let position = transform.method("get_position").invoke();
            forward = Vector3.method("op_Multiply", 2).invoke(forward, 5.0 * deltaTime);

            position = Vector3.method("op_Addition", 2).invoke(position, forward);

            transform.method("set_position").invoke(position);
          }
        },
        toolTip: "Lets you fly around while holding A."
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
        buttonText: "Fling Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger && !perviousTeleportKey){
            const pos = getTransform(gunPointer).method("get_position").invoke()
const spaceship = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("Spaceship"), pos, identityQuaternion, 0, NULL)
sendAllOutgoing()
            };;
          }
perviousTeleportKey = rightTrigger;
        }, 
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Access Mirror",
        method: () => {
          const THISFUCKINGPIECEOFSHITIHATEYOU = Object.method("FindObjectsOfType").inflate(BoxCollider).invoke();
          for (let i = 0; i < THISFUCKINGPIECEOFSHITIHATEYOU.length; i++) {
              const FUCKYOU = THISFUCKINGPIECEOFSHITIHATEYOU.get(i);
              const KILLYOURSELF = getTransform(FUCKYOU).method("get_position")
              if (FUCKYOU.method("get_name").invoke().toString().includes("Cube")) {
              THISFUCKINGPIECEOFSHITIHATEYOU.get(i).method("set_enabled").invoke(false)
              }
          }
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("miroorcolideryeee")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("hahahahahhahahhaheheheh")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("AFJHDSUFHSDIUHHDSIUFHSIDOOR")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("thingcol"))) 
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (5)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (9)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (1)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (3)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (4)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (6)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (2)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (3)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (7)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (5)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (12)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (4)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (10)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (6)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (7)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (9)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (8)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (10)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (11)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (11)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (9)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (8)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (12)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (13)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (14)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (15)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (16)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (17)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (18)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (19)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Plane (20)")))
          Destroy(GameObject.method("Find").invoke(Il2Cpp.string("Cube (13)")))
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Rig Gun",
        method: () => {
          if (rightGrab){
            const gunData = renderGun();
            const gunPointer = gunData.gunPointer;

            if (rightTrigger){
            const pos = getTransform(gunPointer).method("get_position").invoke()
            const playerSpawned = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("photonvr/OnlinePlayerRig"), pos, identityQuaternion, 0, NULL);

            const components = playerSpawned.method("GetComponents", 1).inflate(Component).invoke();

            for (let i = 0; i < components.length; i++) {
              const component = components.get(i);
              const name = component.method("GetType", 0).invoke().method("get_Name").invoke().toString();

              if (name.includes("PhotonVRPlayer"))
              {
                Destroy(component);
              }
            }
sendAllOutgoing()
            };;
          }
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
        buttonText: "No Name",
        method: () => {
          PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string(""))
        },
        isTogglable: false,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Name Spammer",
        method: () => {
          PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string(randomstring()))
          sendAllOutgoing()
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
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
        buttonText: "Set masterclient",
        method: () => {
PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer").invoke())
},
        isTogglable: false,
        toolTip: "Sets you as master client."
      }),
      new ButtonInfo({
        buttonText: "Rig Spam",
        method: () => {
if (rightSecondary) {
    const now = Date.now();
    if (now - lastRunTime >= destroycooldown) {
        lastRunTime = now;
          const clonedrig = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("photonvr/OnlinePlayerRig"), getTransform(headCollider).method("get_position").invoke(), identityQuaternion, 0, NULL)
            const components = clonedrig.method("GetComponents", 1).inflate(Component).invoke();

            for (let i = 0; i < components.length; i++) {
              const component = components.get(i);
              const name = component.method("GetType", 0).invoke().method("get_Name").invoke().toString();

              if (name.includes("PhotonVRPlayer"))
              {
setTimeout(function () {
                Destroy(component);
}, 150)
}
              }
            }
sendAllOutgoing()
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Rig Spam (Random name)",
        method: () => {
if (rightSecondary) {
    const now = Date.now();
    if (now - lastRunTime >= destroycooldown) {
        lastRunTime = now;
          const clonedrig = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("photonvr/OnlinePlayerRig"), getTransform(headCollider).method("get_position").invoke(), identityQuaternion, 0, NULL)
            const components = clonedrig.method("GetComponents", 1).inflate(Component).invoke();

            for (let i = 0; i < components.length; i++) {
              const component = components.get(i);
              const name = component.method("GetType", 0).invoke().method("get_Name").invoke().toString();

              if (name.includes("PhotonVRPlayer"))
              {
setTimeout(function () {
                Destroy(component);
}, 150)
setTimeout(function () {
PhotonNetwork.method("set_NickName").invoke(Il2Cpp.string(randomstring()))
}, 500)

}
              }
            }
sendAllOutgoing()
}
        },
        isTogglable: true,
        toolTip: "Spawns a hoverboard where your gun aims."
      }),
      new ButtonInfo({
        buttonText: "Lag All",
        method: () => {
          const thingforlag = PhotonNetwork.method("Instantiate", 5).invoke(Il2Cpp.string("photonvr/OnlinePlayerRig"), [100.0, 100.0, 0.0], identityQuaternion, 0, NULL)
          Destroy(thingforlag)
sendAllOutgoing()
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
    ],
    [ // Spawner Mods [4]
      new ButtonInfo({
        buttonText: "Exit Room Mods",
        method: () => currentCategory = 0,
        isTogglable: false,
        toolTip: "Returns you back to the main category."
      }),
      new ButtonInfo({
        buttonText: "Join random",
        method: () => {
PhotonNetwork.method("JoinRandomRoom").invoke()
},
        isTogglable: false,
        toolTip: "Returns you back to the main category."
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

  const LateUpdate = GTPlayer.method("EJKBKMONMDG");

  LateUpdate.implementation = function () {
    OVRInputHandler.update();
    
    leftPrimary = OVRInputHandler.leftControllerPrimaryButton
    leftSecondary = OVRInputHandler.leftControllerSecondaryButton;

    rightPrimary = OVRInputHandler.rightControllerPrimaryButton;
    rightSecondary = OVRInputHandler.rightControllerSecondaryButton;

    leftGrab = OVRInputHandler.leftGrab;
    rightGrab = OVRInputHandler.rightGrab;

    leftTrigger = OVRInputHandler.leftControllerTriggerButton;
    rightTrigger = OVRInputHandler.rightControllerTriggerButton;

    deltaTime = Time.method("get_deltaTime").invoke();
    time = Time.method("get_time").invoke();

    if (leftSecondary)
    {
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
AssemblyCSharp.class("youbroketherules").method("OnTriggerEnter").implementation = function () {
return;
}
  console.log(`

     ••╹   ┏┓     • ┓  ┳┳┓      
     ┓┓ ┏  ┗┓╋┓┏┏┓┓┏┫  ┃┃┃┏┓┏┓┓┏
     ┗┗ ┛  ┗┛┗┗┻┣┛┗┗┻  ┛ ┗┗ ┛┗┗┻
                ┛               
    ii's Stupid Menu Quest 1.1.0
    Compiled ${new Date().toISOString()}
`);

}, "main");