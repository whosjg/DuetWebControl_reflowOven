'use strict'

import Vue from 'vue'

import {
	AnalogSensorType,
	BoardState,
	Compatibility,
	DistanceUnit,
	EndstopType,
	FilamentMonitorStatus,
	FilamentMonitorType,
	HeaterMonitorAction, HeaterMonitorCondition,
	HttpEndpointType,
	InputChannelState,
	KinematicsName,
	MessageBoxMode,
	MessageType,
	NetworkInterfaceType,
	ProbeType,
	SpindleState,
	ToolState
} from './modelEnums.js'
import { PluginManifest } from '../../plugins/manifest.js'
import { quickPatch } from '../../utils/patch.js'

export class Accelerometer {
	constructor(initData) { quickPatch(this, initData); }
	points = 0
	runs = 0
}

export class AnalogSensor {
	constructor(initData) { quickPatch(this, initData); }
	lastReading = null
	name = ''
	type = AnalogSensorType.unknown
}

export class Axis {
	constructor(initData) { quickPatch(this, initData); }
	acceleration = 500
	babystep = 0
	current = 0
	drivers = []
	homed = false
	jerk = 15
	letter = '\0'
	machinePosition = null
	max = 200
	maxProbed = false
	microstepping = {
		interpolated: false,
		value: 16
	}
	min = 0
	minProbed = false
	percentCurrent = 100
	percentStstCurrent = null
	speed = 100
	stepsPerMm = 80
	userPosition = null
	visible = true
	workplaceOffsets = []
}

export class BeepRequest {
	constructor(initData) { quickPatch(this, initData); }
	duration = 0
	frequency = 0
}

export class Board {
	constructor(initData) { quickPatch(this, initData); }
	#accelerometer = null
	get accelerometer() { return this.#accelerometer; }
	set accelerometer(value) {
		if (value !== null) {
			fixObject(value, new Accelerometer());
		}
		this.#accelerometer = value;
	}
	bootloaderFileName = null
	canAddress = null
	directDisplay = {
		pulsesPerClick: 0,
		spiFreq: 0,
		typeName: null
	}
	firmwareDate = ''
	firmwareFileName = null
	firmwareName = ''
	firmwareVersion = ''
	iapFileNameSBC = null		// *** requires SBC support
	iapFileNameSD = null		// *** requires SD support
	maxHeaters = 0
	maxMotors = 0
	mcuTemp = {
		current: -273.1,
		min: -273.1,
		max: -273.1
	}
	name = ''
	shortName = ''
	state = BoardState.unknown
	supportsDirectDisplay = false
	v12 = {
		current: 0,
		min: 0,
		max: 0
	}
	vIn = {
		current: 0,
		min: 0,
		max: 0
	}
}

export class Build {
	constructor(initData) {
		overloadPushMethod(this.objects, new BuildObject());
		quickPatch(this, initData);
	}
	currentObject = -1
	m486Names = false
	m486Numbers = false
	objects = []
}

export class BuildObject {
	constructor(initData) { quickPatch(this, initData); }
	cancelled = false
	name = null
	x = []
	y = []
}

export class Endstop {
	constructor(initData) { quickPatch(this, initData); }
	highEnd = false
	triggered = false
	type = EndstopType.unknown
}

export class Extruder {
	constructor(initData) { quickPatch(this, initData); }
	acceleration = 500
	current = 0
	driver = null
	factor = 1.0
	filament = ''
	jerk = 15
	microstepping = {
		interpolated: false,
		value: 16
	}
	nonlinear = {
		a: 0,
		b: 0,
		upperLimit: 0.2
	}
	percentCurrent = 100
	percentStstCurrent = null
	position = 0
	pressureAdvance = 0
	rawPosition = 0			// *** deprecated as of v3.3, to be replaced with job.rawExtrusion
	speed = 100
	stepsPerMm = 420
}

export class Fan {
	constructor(initData) { quickPatch(this, initData); }
	actualValue = -1
	blip = 0.1
	frequency = 250
	max = 1
	min = 0.1
	name = ''
	requestedValue = 0
	rpm = -1
	thermostatic = {
		heaters: [],
		highTemperature: null,
		lowTemperature: null
	}
}

export class FilamentMonitor {
	constructor(initData) { quickPatch(this, initData); }
	enabled = false
	status = FilamentMonitorStatus.noDataReceived
	type = FilamentMonitorType.unknown
}

export class LaserFilamentMonitor extends FilamentMonitor {
	constructor(initData) {
		super(initData);
		this.type = FilamentMonitorType.laser;
	}

	calibrated = {
		percentMax: 0,
		percentMin: 0,
		sensivity: 0,
		totalDistance: 0
	}
	configured = {
		percentMax: 160,
		percentMin: 60,
		sampleDistance: 3.0
	}
}

export class PulsedFilamentMonitor extends FilamentMonitor {
	constructor(initData) {
		super(initData);
		this.type = FilamentMonitorType.pulsed;
	}

	calibrated = {
		mmPerPulse: 0,
		percentMax: 0,
		percentMin: 0,
		totalDistance: 0
	}
	configured = {
		mmPerPulse: 1,
		percentMax: 160,
		percentMin: 60,
		sampleDistance: 5
	}
}

export class RotatingMagnetFilamentMonitor extends FilamentMonitor {
	constructor(initData = {}) {
		super(initData);
		this.type = FilamentMonitorType.rotatingMagnet;
	}

	calibrated = {
		mmPerRev: 0,
		percentMax: 0,
		percentMin: 0,
		totalDistance: 0
	}
	configured = {
		mmPerRev: 28.8,
		percentMax: 160,
		percentMin: 60,
		sampleDistance: 3
	}
}

export class GpInputPort {
	constructor(initData) { quickPatch(this, initData); }
	value = 0
}

export class GpOutputPort {
	constructor(initData) { quickPatch(this, initData); }
	pwm = 0
}

export class Heater {
	constructor(initData) { quickPatch(this, initData); }
	active = 0
	current = -273.15
	max = 285
	min = -10
	model = {
		deadTime: 5.5,
		enabled: false,
		gain: 340,
		inverted: false,
		maxPwm: 1,
		pid: {
			overridden: false,
			d: 0.0,
			i: 0.0,
			p: 0.0,
			used: true
		},
		standardVoltage: 0,
		timeConstant: 140
	}
	monitors = []
	name = null
	sensor = -1
	standby = 0
	state = null
}

export class HeaterMonitor {
	action = HeaterMonitorAction.generateFault
	condition = HeaterMonitorCondition.disabled
	limit = null
}

export class HttpEndpoint {
	constructor(initData) { quickPatch(this, initData); }
	endpointType = HttpEndpointType.get
	namespace = ''
	path = ''
	unixSocket = ''
}

export class InputChannel {
	constructor(initData) { quickPatch(this, initData); }
	axesRelative = false
	compatibility = Compatibility.repRapFirmware
	distanceUnit = DistanceUnit.mm
	drivesRelative = false
	feedRate = 50
	inMacro = false
	lineNumber = 0
	macroRestartable = false
	name = null
	stackDepth = 0
	state = InputChannelState.idle
	volumetric = false
}

export class Kinematics {
	constructor(initData) { quickPatch(this, initData); }
	name = KinematicsName.unknown
}

export class ZLeadscrewKinematics extends Kinematics {
	constructor(initData) { super(initData); }
	tiltCorrection = {
		correctionFactor: 0,
		lastCorrections: [],
		maxCorrection: 0,
		screwPitch: 0,
		screwX: [],
		screwY: []
	}
}

export class CoreKinematics extends ZLeadscrewKinematics {
	constructor(initData) { super(initData); }
	forwardMatrix = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	]
	inverseMatrix = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	]
}

export class DeltaKinematics extends Kinematics {
	constructor(initData) {
		super({});
		overloadPushMethod(this.towers, new DeltaTower());
		quickPatch(initData);
	}
	deltaRadius = 105.6
	homedHeight = 240
	printRadius = 80
	towers = [
		new DeltaTower(),
		new DeltaTower(),
		new DeltaTower()
	]
	xTilt = 0
	yTilt = 0
}

export class DeltaTower {
	constructor(initData) { quickPatch(this, initData); }
	angleCorrection = 0
	diagonal = 0
	endstopAdjustment = 0
	xPos = 0
	yPos = 0
}

export class HangprinterKinematics extends Kinematics {
	constructor(initData) { super(initData); }
	anchors = [
		[0, -2000, -100],
		[2000, 1000, -100],
		[-2000, 1000, -100],
		[0, 0, 3000]
	]
	printRadius = 1500
}

export class ScaraKinematics extends ZLeadscrewKinematics {
	constructor(initData) { super(initData); }
}

export class Layer {
	constructor(initData) { quickPatch(this, initData); }
	duration = 0
	filament = []
	fractionPrinted = 0
	height = 0
	temperatures = []
}

export class MeshDeviation {
	constructor(initData) { quickPatch(this, initData); }
	deviation = 0
	mean = 0
}

export class Message {
	constructor(initData) { quickPatch(this, initData); }
	time = new Date()
	type = MessageType.success
	content = ''
}

export class MessageBox {
	constructor(initData) { quickPatch(this, initData); }
	axisControls = 0
	mode = MessageBoxMode.okOnly
	message = ''
	seq = -1
	title = ''
	timeout = 0
}

export class MoveQueueItem {
	constructor(initData) { quickPatch(this, initData); }
	gracePeriod = 0
	length = 0
}

export class NetworkInterface {
	constructor(initData) { quickPatch(this, initData); }
	actualIP = null
	firmwareVersion = null
	gateway = null
	mac = null
	subnet = null
	type = NetworkInterfaceType.wifi

	// *** missing in DSF:
	state = null				// one of [null, 'disabled', 'enabled', 'starting1', 'starting2', 'changingMode', 'establishingLink', 'obtainingIP', 'connected', 'active']

	// *** missing in RRF:
	activeProtocols = []		// one or more of ['http', 'https', 'ftp', 'sftp', 'ssh', 'telnet']
	configuredIP = null
	dnsServer = null
	numReconnects = null
	signal = null				// only WiFi (dBm)
	speed = null				// null if unknown and 0 if no link
}

export class ParsedFileInfo {
	constructor(initData) {
		overloadPushMethod(this.thumbnails, new ParsedThumbnail());
		quickPatch(this, initData);
		if (!this.numLayers && initData && initData.height && initData.firstLayerHeight && initData.layerHeight) {
			// approximate the number of layers if it isn't given
			this.numLayers = Math.round((initData.height - initData.firstLayerHeight) / initData.layerHeight) + 1
		}
	}
	filament = []
	fileName = null
	firstLayerHeight = 0
	generatedBy = null
	height = 0
	lastModified = null
	layerHeight = 0
	numLayers = 0
	printTime = null
	simulatedTime = null
	size = 0
	thumbnails = []
}

export class ParsedThumbnail {
	constructor(initData) { quickPatch(this, initData); }
	EncodedImage = null
	Height = 0
	Width = 0
}

export class Plugin extends PluginManifest {
	constructor(initData) { super(initData); }
	dsfFiles = []
	dwcFiles = []
	sdFiles = []
	pid = -1
}

export class Probe {
	constructor(initData) { quickPatch(this, initData); }
	calibrationTemperature = 25
	deployedByUser = false
	disablesHeaters = false
	diveHeight = 5
	maxProbeCount = 1
	offsets = [0, 0]
	recoveryTime = 0
	speed = 2
	temperatureCoefficient = 0
	threshold = 500
	tolerance = 0.03
	travelSpeed = 100
	triggerHeight = 0.7
	type = ProbeType.none
	value = [1000]
}

export class RestorePoint {
	constructor(initData) { quickPatch(this, initData); }
	coords = []
	extruderPos = 0
	fanPwm = 0
	feedRate = 50
	ioBits = 0
	laserPwm = null
	spindleSpeeds = []
	toolNumber = -1
}

export class Spindle {
	constructor(initData) { quickPatch(this, initData); }
	active = 0					// RPM
	configured = false
	current = 0					// RPM
	frequency = 0				// Hz
	min = 60					// RPM
	max = 10000					// RPM
	state = SpindleState.stopped
}

export class Tool {
	constructor(initData) { quickPatch(this, initData); }
	active = []
	axes = []					// may hold sub-arrays of drives per axis
	extruders = []
	fans = []
	feedForward = []
	filamentExtruder = -1
	heaters = []
	mix = []
	name = ''
	number = 0
	offsets = []				// offsets in the same order as the axes
	offsetsProbed = 0			// bitmap of the probed axes
	retraction = {
		extraRestart: 0,
		length: 0,
		speed: 0,
		unretractSpeed: 0,
		zHop: 0
	}
	spindle = -1
	spindleRpm = 0
	standby = []
	state = ToolState.off
}

export class UserSession {		// *** missing in RRF
	constructor(initData) { quickPatch(this, initData); }
	id = 0
	accessLevel = 'readOnly'
	origin = null
	originId = -1
	sessionType = 'local'
}

export class Volume {
	constructor(initData) { quickPatch(this, initData); }
	capacity = null				// in Bytes
	freeSpace = null			// in Bytes
	mounted = false
	name = null					// *** missing in RRF but reserved
	openFiles = null
	path = null
	speed = null				// in Bytes/s
}

export function fixObject(item, preset) {
	for (let key in preset) {
		if (item[key] === undefined) {
			Vue.set(item, key, preset[key]);
		} else if (!(item[key] instanceof Array) && item[key] instanceof Object) {
			fixObject(item[key], preset[key]);
		}
	}
}

function overloadPushMethod(array, preset) {
	const originalPushMethod = Object.getPrototypeOf(array).push;
	array.push = function(item) {
		if (item !== null) {
			fixObject(item, preset);
		}
		originalPushMethod.call(array, Vue.observable(item));
	};
}

export function overloadModelPush(model) {
	overloadPushMethod(model.boards, new Board());
	overloadPushMethod(model.fans, new Fan());
	overloadPushMethod(model.heat.heaters, new Heater());
	overloadPushMethod(model.httpEndpoints, new HttpEndpoint());
	overloadPushMethod(model.inputs, new InputChannel());
	overloadPushMethod(model.job.layers, new Layer());
	overloadPushMethod(model.move.axes, new Axis());
	overloadPushMethod(model.move.extruders, new Extruder());
	overloadPushMethod(model.move.queue, new MoveQueueItem());
	overloadPushMethod(model.network.interfaces, new NetworkInterface());
	overloadPushMethod(model.sensors.analog, new AnalogSensor());
	overloadPushMethod(model.sensors.endstops, new Endstop());
	// Filament monitors need special treatment due to variable item types
	overloadPushMethod(model.sensors.gpIn, new GpInputPort());
	overloadPushMethod(model.sensors.probes, new Probe());
	overloadPushMethod(model.spindles, new Spindle());
	overloadPushMethod(model.state.gpOut, new GpOutputPort());
	overloadPushMethod(model.state.restorePoints, new RestorePoint());
	overloadPushMethod(model.tools, new Tool());
	overloadPushMethod(model.userSessions, new UserSession());
	overloadPushMethod(model.volumes, new Volume());
}

export function fixObjectModel(state, mergeData) {
	if (mergeData.sensors && mergeData.sensors.filamentMonitors) {
		state.sensors.filamentMonitors.forEach(function(filamentSensor) {
			if (filamentSensor) {
				switch (filamentSensor.type) {
					case FilamentMonitorType.laser:
						fixObject(filamentSensor, new LaserFilamentMonitor());
						break;
					case FilamentMonitorType.pulsed:
						fixObject(filamentSensor, new PulsedFilamentMonitor());
						break;
					case FilamentMonitorType.rotatingMagnet:
						fixObject(filamentSensor, new RotatingMagnetFilamentMonitor());
						break;
					default:
						fixObject(filamentSensor, new FilamentMonitor());
						break;
				}
			}
		});
	}
}
