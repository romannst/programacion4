// Dadas las siguientes dos clases, realizar las siguientes tareas:
// 1. Crear una clase abstracta SmartDevice y hacer que SmartTV y SmartSpeaker hereden de ella.
//    SmartDevice debe implementar todas las propiedades y métodos necesarios.
// 2. Agregar todos los getters y setters que falten.
// 3. Agregar la posibilidad de mutear y desmutear un dispositivo.
// 4. Crear una clase SmartLight que herede de SmartDevice.
// 5. SmartLight debe poder cambiar el brillo.
// 6. Agregar en SmartDevice un método para controlar que un valor esté entre 0 y 100,
//    y utilizarlo para ajustar el volumen y el brillo según corresponda.
// 7. Validar que las acciones del dispositivo solo sean posibles de ejecutar si este está encendido.
// 8. Crear una clase SmartDeviceManager que administre un arreglo de SmartDevices y realice las siguientes operaciones:
//      a. Agregar y quitar dispositivos, evitando duplicados.
//      b. Apagar y encender todos los dispositivos.
//      c. Verificar si todos los dispositivos están apagados.
//      d. Verificar si algún dispositivo está muteado.
//      e. Verificar si dos dispositivos son del mismo tipo.
//      f. Obtener todos los dispositivos encendidos.
//      g. Encontrar un dispositivo en particular por su ID.
//      h. Obtener el nombre de todos los dispositivos.

abstract class SmartDevice {
    protected id: string;
    protected name: string;
    protected isOn: boolean;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.isOn = false;
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getIsOn(): boolean {
        return this.isOn;
    }

    public validateValue(value: number): boolean {
        return value >= 0 && value <= 100;
    }

    abstract turnOn(): void;
    abstract turnOff(): void;
    abstract getStatus(): string;
}

class SmartTV extends SmartDevice {
    protected volume: number;
    protected currentChannel: number;
    protected isMuted: boolean;

    constructor(id: string, name: string) {
        super(id, name);
        this.volume = 10;
        this.currentChannel = 1;
        this.isMuted = false;
    }

    turnOn(): void {
        this.isOn = true;
    }
    turnOff(): void {
        this.isOn = false;
    }
    setVolume(level: number): void {
        if (!this.validateValue(level)) {
            throw new Error("El nivel de volumen debe estar entre 0 y 100.");
        }
        if (!this.isOn) {
            throw new Error("No se puede cambiar el volumen si la TV está apagada.");
        }
        this.volume = level;
    }
    changeChannel(channel: number): void {
        if (!this.isOn) {
            throw new Error("No se puede cambiar el canal si la TV está apagada.");
        }
        this.currentChannel = channel;
    }
    mute(): void {
        if (!this.isOn) {
            throw new Error("No se puede mutear si la TV está apagada.");
        }
        this.isMuted = true;
    }
    unmute(): void {
        if (!this.isOn) {
            throw new Error("No se puede desmutear si la TV está apagada.");
        }
        this.isMuted = false;
    }
    muteStatus(): boolean {
        return this.isMuted;
    }

    getStatus(): string {
        return `La TV ${this.name} está ${this.isOn ? "prendida" : "apagada"} en el canal ${this.currentChannel}.`;
    }
}

class SmartSpeaker extends SmartDevice {
    protected volume: number;
    protected currentSong: string;
    protected isMuted: boolean;

    constructor(id: string, name: string) {
        super(id, name);
        this.volume = 5;
        this.currentSong = "None";
        this.isMuted = false;
    }

    turnOn(): void {
        this.isOn = true;
    }
    turnOff(): void {
        this.isOn = false;
    }
    setVolume(level: number): void {
        if (!this.validateValue(level)) {
            throw new Error("El nivel de volumen debe estar entre 0 y 100.");
        }
        if (!this.isOn) {
            throw new Error("No se puede cambiar el volumen si el parlante está apagado.");
        }
        this.volume = level;
    }
    playSong(song: string): void {
        if (!this.isOn) {
            throw new Error("No se puede reproducir una canción si el parlante está apagado.");
        }
        this.currentSong = song;
    }
    mute(): void {
        if (!this.isOn) {
            throw new Error("No se puede mutear si el parlante está apagado.");
        }
        this.isMuted = true;
    }
    unmute(): void {
        if (!this.isOn) {
            throw new Error("No se puede desmutear si el parlante está apagado.");
        }
        this.isMuted = false;
    }
    muteStatus(): boolean {
        return this.isMuted;
    }

    getStatus(): string {
        return `El parlante ${this.name} está ${this.isOn ? "prendida" : "apagada"} con la canción ${this.currentSong}.`;
    }
}

class SmartLight extends SmartDevice {
    protected brightness: number;

    constructor(id: string, name: string) {
        super(id, name);
        this.brightness = 50;
    }

    turnOn(): void {
        this.isOn = true;
    }
    turnOff(): void {
        this.isOn = false;
    }
    setBrightness(level: number): void {
        if (!this.validateValue(level)) {
            throw new Error("El nivel de brillo debe estar entre 0 y 100.");
        }
        if (!this.isOn) {
            throw new Error("No se puede cambiar el brillo si la luz está apagada.");
        }
        this.brightness = level;
    }

    getStatus(): string {
        return `La luz ${this.name} está ${this.isOn ? "prendida" : "apagada"} con brillo ${this.brightness}.`;
    }
}

class SmartDeviceManager {
    protected smart_devices: SmartDevice[];

    constructor() {
        this.smart_devices = [];
    }

    private deviceExists(device: SmartDevice): boolean {
        for(const dev of this.smart_devices) {
            if(dev.getId() === device.getId()) {
                return true;
            }
        }
        return false;
    }

    addDevice(device: SmartDevice): void {
        if(device === null || device === undefined) {
            throw new Error("El dispositivo no puede ser nulo o indefinido.");
        }
        if(this.deviceExists(device)) {
            throw new Error("El dispositivo ya existe en el administrador.");
        }
        this.smart_devices.push(device);
    }
    removeDevice(device: SmartDevice): void {
        if(device === null || device === undefined) {
            throw new Error("El dispositivo no puede ser nulo o indefinido.");
        }
        const index = this.smart_devices.findIndex(
            dev => dev.getId() === device.getId()
        );
        if (index === -1) {
            throw new Error("El dispositivo no existe en el administrador.");
        }
        this.smart_devices.splice(index, 1);
    }
    turnOnAllDevices(): void {
        for(const device of this.smart_devices) {
            device.turnOn();
        }
    }
    turnOffAllDevices(): void {
        for(const device of this.smart_devices) {
            device.turnOff();
        }
    }
    verifyAllDevicesOff(): boolean {
        for(const device of this.smart_devices) {
            if(device.getIsOn()) {
                return false;
            }
        }
        return true;
    }
    deviceIsMuted(device: SmartDevice): boolean {
        if(device === null || device === undefined) {
            throw new Error("El dispositivo no puede ser nulo o indefinido.");
        }
        if(!this.deviceExists(device)) {
            throw new Error("El dispositivo no existe en el administrador.");
        }
        for(const dev of this.smart_devices) {
            if (device instanceof SmartTV || device instanceof SmartSpeaker) {
                if (device.muteStatus()) {
                    return true;
                }
            }
        }
        return false;
    }
    sameType(device1: SmartDevice, device2: SmartDevice): boolean {
        if(device1 === null || device1 === undefined || device2 === null || device2 === undefined) {
            throw new Error("Los dispositivos no pueden ser nulos o indefinidos.");
        }
        if((device1 instanceof SmartTV && device2 instanceof SmartTV) || (device1 instanceof SmartSpeaker && device2 instanceof SmartSpeaker) || (device1 instanceof SmartLight && device2 instanceof SmartLight)) {
            return true;
        }
        return false;
    }
    devicesOn(): SmartDevice[] {
        if(this.smart_devices.length === 0) {
            throw new Error("No hay dispositivos en el administrador.");
        }
        if(this.verifyAllDevicesOff()) {
            throw new Error("Todos los dispositivos están apagados.");
        }
        const devicesOn: SmartDevice[] = [];
        for(const device of this.smart_devices) {
            if(device.getIsOn()) {
                devicesOn.push(device);
            }
        }
        return devicesOn;
    }
    findDeviceById(id: string): SmartDevice | null {
        if(id === null || id === undefined) {
            throw new Error("El ID no puede ser nulo o indefinido.");
        }
        if(id.trim() === "") {
            throw new Error("El ID no puede estar vacío.");
        }
        for(const device of this.smart_devices) {
            if(device.getId() === id) {
                return device;
            }
        }
        return null;
    }
    getDeviceNames(): string[] {
        if(this.smart_devices.length === 0) {
            throw new Error("No hay dispositivos en el administrador.");
        }
        const deviceNames: string[] = [];
        for(const device of this.smart_devices) {
            deviceNames.push(device.getName());
        }
        return deviceNames;
    }
}