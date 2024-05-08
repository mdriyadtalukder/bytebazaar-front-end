import { useParams } from "react-router-dom";
import {  useGetAProductQuery, useUpdateLaptopMutation } from "../../../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../../../loading/Loading";
import { TiArrowSyncOutline } from "react-icons/ti";
import axios from "axios";
import Swal from "sweetalert2";
//const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
//const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Update = () => {
    const { id } = useParams();
    const { data, isError, isLoading, error } = useGetAProductQuery(id);
    const [updateLaptop, { isLoading: loading }] = useUpdateLaptopMutation()
    // editProduct(id: id, data: {
    //     ...(name || photo || price || quantity ? 
    //       {
    //         productName: name,
    //         productImage: photo,
    //         productPrice: price,
    //         productQuantity: quantity
    //       } 
    //       : {}),
    //     ...(brand || model || series || part ? 
    //       {
    //         productGeneral: {
    //           ...(brand ? { productBrand: brand } : {}),
    //           ...(model ? { productModel: model } : {}),
    //           ...(series ? { productLaptopSeries: series } : {}),
    //           ...(part ? { productPartNo: part } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(pBrand || pType || generation || pModel || pCore || performance || effeciantCores ? 
    //       {
    //         productProcessor: {
    //           ...(pBrand ? { processorBrand: pBrand } : {}),
    //           ...(pType ? { processorType: pType } : {}),
    //           ...(generation ? { processorGeneration: generation } : {}),
    //           ...(pModel ? { processorModel: pModel } : {}),
    //           ...(pCore ? { processorCore: pCore } : {}),
    //           ...(performance ? { performanceCores: performance } : {}),
    //           ...(effeciantCores ? { efficientCores: effeciantCores } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(ram || installedRAMDetails || ramType || totalRAMSlot || emptyExpansionRAMSlot || maxRAMSupport ? 
    //       {
    //         productMemory: {
    //           ...(ram ? { ram: ram } : {}),
    //           ...(installedRAMDetails ? { installedRAMDetails: installedRAMDetails } : {}),
    //           ...(ramType ? { ramType: ramType } : {}),
    //           ...(totalRAMSlot ? { totalRAMSlot: totalRAMSlot } : {}),
    //           ...(emptyExpansionRAMSlot ? { emptyExpansionRAMSlot: emptyExpansionRAMSlot } : {}),
    //           ...(maxRAMSupport ? { maxRAMSupport: maxRAMSupport } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(storage || installedHDDType || hddRPM || hddExpansionSlot || installedSSDType || m2ssdExpansionSlot || storageUpgrade ? 
    //       {
    //         productStorage: {
    //           ...(storage ? { storage: storage } : {}),
    //           ...(installedHDDType ? { installedHDDType: installedHDDType } : {}),
    //           ...(hddRPM ? { hddRPM: hddRPM } : {}),
    //           ...(hddExpansionSlot ? { hddExpansionSlot: hddExpansionSlot } : {}),
    //           ...(installedSSDType ? { installedSSDType: installedSSDType } : {}),
    //           ...(m2ssdExpansionSlot ? { m2ssdExpansionSlot: m2ssdExpansionSlot } : {}),
    //           ...(storageUpgrade ? { storageUpgrade: storageUpgrade } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(graphicsChipset || graphicsMemoryAccessibility || graphicsMemory || graphicsMemoryType ? 
    //       {
    //         productGraphics: {
    //           ...(graphicsChipset ? { graphicsChipset: graphicsChipset } : {}),
    //           ...(graphicsMemoryAccessibility ? { graphicsMemoryAccessibility: graphicsMemoryAccessibility } : {}),
    //           ...(graphicsMemory ? { graphicsMemory: graphicsMemory } : {}),
    //           ...(graphicsMemoryType ? { graphicsMemoryType: graphicsMemoryType } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(displaySizeInch || displayType || panelType || displayResolution || displaySurface || touchScreen || displayRefreshRate || displayBezel || brightness || displayFeatures || secondaryScreenSize || secondaryScreenTechnology || secondaryScreenResolution ? 
    //       {
    //         productDisplay: {
    //           ...(displaySizeInch ? { displaySizeInch: displaySizeInch } : {}),
    //           ...(displayType ? { displayType: displayType } : {}),
    //           ...(panelType ? { panelType: panelType } : {}),
    //           ...(displayResolution ? { displayResolution: displayResolution } : {}),
    //           ...(displaySurface ? { displaySurface: displaySurface } : {}),
    //           ...(touchScreen ? { touchScreen: touchScreen } : {}),
    //           ...(displayRefreshRate ? { displayRefreshRate: displayRefreshRate } : {}),
    //           ...(displayBezel ? { displayBezel: displayBezel } : {}),
    //           ...(brightness ? { brightness: brightness } : {}),
    //           ...(displayFeatures ? { displayFeatures: displayFeatures } : {}),
    //           ...(secondaryScreenSize ? { secondaryScreenSize: secondaryScreenSize } : {}),
    //           ...(secondaryScreenTechnology ? { secondaryScreenTechnology: secondaryScreenTechnology } : {}),
    //           ...(secondaryScreenResolution ? { secondaryScreenResolution: secondaryScreenResolution } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(opticalDrive || multimediaCardSlot || supportedMultimediaCard || usb2Port || usb3Port || usbCThunderboltPort || hdmiPort || microHdmiPort || miniHdmiPort || displayPort || miniDPPort || vgaDSub || headphonePort || microphonePort || securityLockSlot ? 
    //       {
    //         productPortsSlots: {
    //           ...(opticalDrive ? { opticalDrive: opticalDrive } : {}),
    //           ...(multimediaCardSlot ? { multimediaCardSlot: multimediaCardSlot } : {}),
    //           ...(supportedMultimediaCard ? { supportedMultimediaCard: supportedMultimediaCard } : {}),
    //           ...(usb2Port ? { usb2Port: usb2Port } : {}),
    //           ...(usb3Port ? { usb3Port: usb3Port } : {}),
    //           ...(usbCThunderboltPort ? { usbCThunderboltPort: usbCThunderboltPort } : {}),
    //           ...(hdmiPort ? { hdmiPort: hdmiPort } : {}),
    //           ...(microHdmiPort ? { microHdmiPort: microHdmiPort } : {}),
    //           ...(miniHdmiPort ? { miniHdmiPort: miniHdmiPort } : {}),
    //           ...(displayPort ? { displayPort: displayPort } : {}),
    //           ...(miniDPPort ? { miniDPPort: miniDPPort } : {}),
    //           ...(vgaDSub ? { vgaDSub: vgaDSub } : {}),
    //           ...(headphonePort ? { headphonePort: headphonePort } : {}),
    //           ...(microphonePort ? { microphonePort: microphonePort } : {}),
    //           ...(securityLockSlot ? { securityLockSlot: securityLockSlot } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(lanValue || wiFiValue || bluetoothValue ? 
    //       {
    //         productNetworkConnectivity: {
    //           ...(lanValue ? { lan: lanValue } : {}),
    //           ...(wiFiValue ? { wiFi: wiFiValue } : {}),
    //           ...(bluetoothValue ? { bluetooth: bluetoothValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(audioPropertiesValue || speakerValue || microphoneValue || webCamValue ? 
    //       {
    //         productAudioCamera: {
    //           ...(audioPropertiesValue ? { audioProperties: audioPropertiesValue } : {}),
    //           ...(speakerValue ? { speaker: speakerValue } : {}),
    //           ...(microphoneValue ? { microphone: microphoneValue } : {}),
    //           ...(webCamValue ? { webCam: webCamValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(keyboardLayoutValue || keyboardBacklitValue || rgbKeyboardValue || numKeypadValue || pointingDeviceValue ? 
    //       {
    //         productKeyboard: {
    //           ...(keyboardLayoutValue ? { keyboardLayout: keyboardLayoutValue } : {}),
    //           ...(keyboardBacklitValue ? { keyboardBacklit: keyboardBacklitValue } : {}),
    //           ...(rgbKeyboardValue ? { rgbKeyboard: rgbKeyboardValue } : {}),
    //           ...(numKeypadValue ? { numKeypad: numKeypadValue } : {}),
    //           ...(pointingDeviceValue ? { pointingDevice: pointingDeviceValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(fingerPrintSensorValue ? 
    //       {
    //         productSecurity: {
    //           ...(fingerPrintSensorValue ? { fingerPrintSensor: fingerPrintSensorValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(operatingSystemValue || licensedApplicationValue ? 
    //       {
    //         productSoftware: {
    //           ...(operatingSystemValue ? { operatingSystem: operatingSystemValue } : {}),
    //           ...(licensedApplicationValue ? { licensedApplication: licensedApplicationValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(colorValue || dimensionsValue || weightKgValue || packageContentValue ? 
    //       {
    //         productPhysicalDescription: {
    //           ...(colorValue ? { color: colorValue } : {}),
    //           ...(dimensionsValue ? { dimensions: dimensionsValue } : {}),
    //           ...(weightKgValue ? { weightKg: weightKgValue } : {}),
    //           ...(packageContentValue ? { packageContent: packageContentValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(batteryCapacityValue || batteryTypeValue || backupTimeValue || powerAdapterValue || adapterTypeValue ? 
    //       {
    //         productPower: {
    //           ...(batteryCapacityValue ? { batteryCapacity: batteryCapacityValue } : {}),
    //           ...(batteryTypeValue ? { batteryType: batteryTypeValue } : {}),
    //           ...(backupTimeValue ? { backupTime: backupTimeValue } : {}),
    //           ...(powerAdapterValue ? { powerAdapter: powerAdapterValue } : {}),
    //           ...(adapterTypeValue ? { adapterType: adapterTypeValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(warrantyValue || warrantyDetailsValue || warrantyClaimDurationApproximateValue ? 
    //       {
    //         productWarranty: {
    //           ...(warrantyValue ? { warranty: warrantyValue } : {}),
    //           ...(warrantyDetailsValue ? { warrantyDetails: warrantyDetailsValue } : {}),
    //           ...(warrantyClaimDurationApproximateValue ? { warrantyClaimDurationApproximate: warrantyClaimDurationApproximateValue } : {})
    //         }
    //       } 
    //       : {}),
    //     ...(certificationsValue || bestForValue || specialtyValue || othersValue || countryOfOriginValue || madeInAssembleValue || disclaimerValue ? 
    //       {
    //         productAdditionalInfo: {
    //           ...(certificationsValue ? { certifications: certificationsValue } : {}),
    //           ...(bestForValue ? { bestFor: bestForValue } : {}),
    //           ...(specialtyValue ? { specialty: specialtyValue } : {}),
    //           ...(othersValue ? { others: othersValue } : {}),
    //           ...(countryOfOriginValue ? { countryOfOrigin: countryOfOriginValue } : {}),
    //           ...(madeInAssembleValue ? { madeInAssemble: madeInAssembleValue } : {}),
    //           ...(disclaimerValue ? { disclaimer: disclaimerValue } : {})
    //         }
    //       } 
    //       : {})
    //   })

    const handleEditing = (e) => {
        e.preventDefault();

        //---------in imgbb update image-------------------------
        // const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        // const image = forms.get('image');
        // const data1 = new FormData();
        // data1.append('image', image)
        // const res = await axios.post(image_hosting_api, data1)
        //-----------------------------------------------------------
        const form = e.target;

        const name = form.names?.value;
        const price = form.price?.value;
        const quantity = form.quantity?.value;
        //const photo = res?.data?.data?.display_url;

        const brand = form.brand?.value;
        const model = form.model?.value;
        const series = form.series?.value;
        const part = form.part?.value;

        const pBrand = form.processorBrand?.value;
        const pType = form.processorType?.value;
        const generation = form.processorGeneration?.value;
        const pModel = form.processorModel?.value;
        const pCore = form.processorCore?.value;
        const performance = form.performanceCores?.value;
        const effeciantCores = form.efficientCores?.value;

        const ram = form.ram?.value;
        const installedRAMDetails = form.installedRAMDetails?.value;
        const ramType = form.ramType?.value;
        const totalRAMSlot = form.totalRAMSlot?.value;
        const emptyExpansionRAMSlot = form.emptyExpansionRAMSlot?.value;
        const maxRAMSupport = form.maxRAMSupport?.value;

        const storage = form.storage?.value;
        const installedHDDType = form.installedHDDType?.value;
        const hddRPM = form.hddRPM?.value;
        const hddExpansionSlot = form.hddExpansionSlot?.value;
        const installedSSDType = form.installedSSDType?.value;
        const m2ssdExpansionSlot = form.m2ssdExpansionSlot?.value;
        const storageUpgrade = form.storageUpgrade?.value;

        // Accessing form values
        const graphicsChipset = form.graphicsChipset?.value;
        const graphicsMemoryAccessibility = form.graphicsMemoryAccessibility?.value;
        const graphicsMemory = form.graphicsMemory?.value;
        const graphicsMemoryType = form.graphicsMemoryType?.value;

        // Accessing form values
        const displaySizeInch = form.displaySizeInch?.value;
        const displayType = form.displayType?.value;
        const panelType = form.panelType?.value;
        const displayResolution = form.displayResolution?.value;
        const displaySurface = form.displaySurface?.value;
        const touchScreen = form.touchScreen?.value;
        const displayRefreshRate = form.displayRefreshRate?.value;
        const displayBezel = form.displayBezel?.value;
        const brightness = form.brightness?.value;
        const displayFeatures = form.displayFeatures?.value;
        const secondaryScreenSize = form.secondaryScreenSize?.value;
        const secondaryScreenTechnology = form.secondaryScreenTechnology?.value;
        const secondaryScreenResolution = form.secondaryScreenResolution?.value;

        // Accessing form values
        const opticalDrive = form.opticalDrive?.value;
        const multimediaCardSlot = form.multimediaCardSlot?.value;
        const supportedMultimediaCard = form.supportedMultimediaCard?.value;
        const usb2Port = form.usb2Port?.value;
        const usb3Port = form.usb3Port?.value;
        const usbCThunderboltPort = form.usbCThunderboltPort?.value;
        const hdmiPort = form.hdmiPort?.value;
        const microHdmiPort = form.microHdmiPort?.value;
        const miniHdmiPort = form.miniHdmiPort?.value;
        const displayPort = form.displayPort?.value;
        const miniDPPort = form.miniDPPort?.value;
        const vgaDSub = form.vgaDSub?.value;
        const headphonePort = form.headphonePort?.value;
        const microphonePort = form.microphonePort?.value;
        const securityLockSlot = form.securityLockSlot?.value;

        // Accessing form values
        const lanValue = form.lan?.value;
        const wiFiValue = form.wiFi?.value;
        const bluetoothValue = form.bluetooth?.value;

        const audioPropertiesValue = form.audioProperties?.value;
        const speakerValue = form.speaker?.value;
        const microphoneValue = form.microphone?.value;
        const webCamValue = form.webCam?.value;

        const keyboardLayoutValue = form.keyboardLayout?.value;
        const keyboardBacklitValue = form.keyboardBacklit?.value;
        const rgbKeyboardValue = form.rgbKeyboard?.value;
        const numKeypadValue = form.numKeypad?.value;
        const pointingDeviceValue = form.pointingDevice?.value;


        const fingerPrintSensorValue = form.fingerPrintSensor?.value;

        const operatingSystemValue = form.operatingSystem?.value;
        const licensedApplicationValue = form.licensedApplication?.value;

        const colorValue = form.color?.value;
        const dimensionsValue = form.dimensions?.value;
        const weightKgValue = form.weightKg?.value;
        const packageContentValue = form.packageContent?.value;

        const batteryCapacityValue = form.batteryCapacity?.value;
        const batteryTypeValue = form.batteryType?.value;
        const backupTimeValue = form.backupTime?.value;
        const powerAdapterValue = form.powerAdapter?.value;
        const adapterTypeValue = form.adapterType?.value;

        const warrantyValue = form.warranty?.value;
        const warrantyDetailsValue = form.warrantyDetails?.value;
        const warrantyClaimDurationApproximateValue = form.warrantyClaimDurationApproximate?.value;

        const certificationsValue = form.certifications?.value;
        const bestForValue = form.bestFor?.value;
        const specialtyValue = form.specialty?.value;
        const othersValue = form.others?.value;
        const countryOfOriginValue = form.countryOfOrigin?.value;
        const madeInAssembleValue = form.madeInAssemble?.value;
        const disclaimerValue = form.disclaimer?.value;

        updateLaptop({
            id: data?._id,
            data: {

                productName: name,
                productImage: data?.productImage,
                productPrice: price,
                productQuantity: quantity
                ,
                ...(brand || model || series || part ?
                    {
                        productGeneral: {
                            ...(brand ? { productBrand: brand } : {}),
                            ...(model ? { productModel: model } : {}),
                            ...(series ? { productLaptopSeries: series } : {}),
                            ...(part ? { productPartNo: part } : {})
                        }
                    }
                    : {}),
                ...(pBrand || pType || generation || pModel || pCore || performance || effeciantCores ?
                    {
                        productProcessor: {
                            ...(pBrand ? { processorBrand: pBrand } : {}),
                            ...(pType ? { processorType: pType } : {}),
                            ...(generation ? { processorGeneration: generation } : {}),
                            ...(pModel ? { processorModel: pModel } : {}),
                            ...(pCore ? { processorCore: pCore } : {}),
                            ...(performance ? { performanceCores: performance } : {}),
                            ...(effeciantCores ? { efficientCores: effeciantCores } : {})
                        }
                    }
                    : {}),
                ...(ram || installedRAMDetails || ramType || totalRAMSlot || emptyExpansionRAMSlot || maxRAMSupport ?
                    {
                        productMemory: {
                            ...(ram ? { ram: ram } : {}),
                            ...(installedRAMDetails ? { installedRAMDetails: installedRAMDetails } : {}),
                            ...(ramType ? { ramType: ramType } : {}),
                            ...(totalRAMSlot ? { totalRAMSlot: totalRAMSlot } : {}),
                            ...(emptyExpansionRAMSlot ? { emptyExpansionRAMSlot: emptyExpansionRAMSlot } : {}),
                            ...(maxRAMSupport ? { maxRAMSupport: maxRAMSupport } : {})
                        }
                    }
                    : {}),
                ...(storage || installedHDDType || hddRPM || hddExpansionSlot || installedSSDType || m2ssdExpansionSlot || storageUpgrade ?
                    {
                        productStorage: {
                            ...(storage ? { storage: storage } : {}),
                            ...(installedHDDType ? { installedHDDType: installedHDDType } : {}),
                            ...(hddRPM ? { hddRPM: hddRPM } : {}),
                            ...(hddExpansionSlot ? { hddExpansionSlot: hddExpansionSlot } : {}),
                            ...(installedSSDType ? { installedSSDType: installedSSDType } : {}),
                            ...(m2ssdExpansionSlot ? { m2ssdExpansionSlot: m2ssdExpansionSlot } : {}),
                            ...(storageUpgrade ? { storageUpgrade: storageUpgrade } : {})
                        }
                    }
                    : {}),
                ...(graphicsChipset || graphicsMemoryAccessibility || graphicsMemory || graphicsMemoryType ?
                    {
                        productGraphics: {
                            ...(graphicsChipset ? { graphicsChipset: graphicsChipset } : {}),
                            ...(graphicsMemoryAccessibility ? { graphicsMemoryAccessibility: graphicsMemoryAccessibility } : {}),
                            ...(graphicsMemory ? { graphicsMemory: graphicsMemory } : {}),
                            ...(graphicsMemoryType ? { graphicsMemoryType: graphicsMemoryType } : {})
                        }
                    }
                    : {}),
                ...(displaySizeInch || displayType || panelType || displayResolution || displaySurface || touchScreen || displayRefreshRate || displayBezel || brightness || displayFeatures || secondaryScreenSize || secondaryScreenTechnology || secondaryScreenResolution ?
                    {
                        productDisplay: {
                            ...(displaySizeInch ? { displaySizeInch: displaySizeInch } : {}),
                            ...(displayType ? { displayType: displayType } : {}),
                            ...(panelType ? { panelType: panelType } : {}),
                            ...(displayResolution ? { displayResolution: displayResolution } : {}),
                            ...(displaySurface ? { displaySurface: displaySurface } : {}),
                            ...(touchScreen ? { touchScreen: touchScreen } : {}),
                            ...(displayRefreshRate ? { displayRefreshRate: displayRefreshRate } : {}),
                            ...(displayBezel ? { displayBezel: displayBezel } : {}),
                            ...(brightness ? { brightness: brightness } : {}),
                            ...(displayFeatures ? { displayFeatures: displayFeatures } : {}),
                            ...(secondaryScreenSize ? { secondaryScreenSize: secondaryScreenSize } : {}),
                            ...(secondaryScreenTechnology ? { secondaryScreenTechnology: secondaryScreenTechnology } : {}),
                            ...(secondaryScreenResolution ? { secondaryScreenResolution: secondaryScreenResolution } : {})
                        }
                    }
                    : {}),
                ...(opticalDrive || multimediaCardSlot || supportedMultimediaCard || usb2Port || usb3Port || usbCThunderboltPort || hdmiPort || microHdmiPort || miniHdmiPort || displayPort || miniDPPort || vgaDSub || headphonePort || microphonePort || securityLockSlot ?
                    {
                        productPortsSlots: {
                            ...(opticalDrive ? { opticalDrive: opticalDrive } : {}),
                            ...(multimediaCardSlot ? { multimediaCardSlot: multimediaCardSlot } : {}),
                            ...(supportedMultimediaCard ? { supportedMultimediaCard: supportedMultimediaCard } : {}),
                            ...(usb2Port ? { usb2Port: usb2Port } : {}),
                            ...(usb3Port ? { usb3Port: usb3Port } : {}),
                            ...(usbCThunderboltPort ? { usbCThunderboltPort: usbCThunderboltPort } : {}),
                            ...(hdmiPort ? { hdmiPort: hdmiPort } : {}),
                            ...(microHdmiPort ? { microHdmiPort: microHdmiPort } : {}),
                            ...(miniHdmiPort ? { miniHdmiPort: miniHdmiPort } : {}),
                            ...(displayPort ? { displayPort: displayPort } : {}),
                            ...(miniDPPort ? { miniDPPort: miniDPPort } : {}),
                            ...(vgaDSub ? { vgaDSub: vgaDSub } : {}),
                            ...(headphonePort ? { headphonePort: headphonePort } : {}),
                            ...(microphonePort ? { microphonePort: microphonePort } : {}),
                            ...(securityLockSlot ? { securityLockSlot: securityLockSlot } : {})
                        }
                    }
                    : {}),
                ...(lanValue || wiFiValue || bluetoothValue ?
                    {
                        productNetworkConnectivity: {
                            ...(lanValue ? { lan: lanValue } : {}),
                            ...(wiFiValue ? { wiFi: wiFiValue } : {}),
                            ...(bluetoothValue ? { bluetooth: bluetoothValue } : {})
                        }
                    }
                    : {}),
                ...(audioPropertiesValue || speakerValue || microphoneValue || webCamValue ?
                    {
                        productAudioCamera: {
                            ...(audioPropertiesValue ? { audioProperties: audioPropertiesValue } : {}),
                            ...(speakerValue ? { speaker: speakerValue } : {}),
                            ...(microphoneValue ? { microphone: microphoneValue } : {}),
                            ...(webCamValue ? { webCam: webCamValue } : {})
                        }
                    }
                    : {}),
                ...(keyboardLayoutValue || keyboardBacklitValue || rgbKeyboardValue || numKeypadValue || pointingDeviceValue ?
                    {
                        productKeyboard: {
                            ...(keyboardLayoutValue ? { keyboardLayout: keyboardLayoutValue } : {}),
                            ...(keyboardBacklitValue ? { keyboardBacklit: keyboardBacklitValue } : {}),
                            ...(rgbKeyboardValue ? { rgbKeyboard: rgbKeyboardValue } : {}),
                            ...(numKeypadValue ? { numKeypad: numKeypadValue } : {}),
                            ...(pointingDeviceValue ? { pointingDevice: pointingDeviceValue } : {})
                        }
                    }
                    : {}),
                ...(fingerPrintSensorValue ?
                    {
                        productSecurity: {
                            ...(fingerPrintSensorValue ? { fingerPrintSensor: fingerPrintSensorValue } : {})
                        }
                    }
                    : {}),
                ...(operatingSystemValue || licensedApplicationValue ?
                    {
                        productSoftware: {
                            ...(operatingSystemValue ? { operatingSystem: operatingSystemValue } : {}),
                            ...(licensedApplicationValue ? { licensedApplication: licensedApplicationValue } : {})
                        }
                    }
                    : {}),
                ...(colorValue || dimensionsValue || weightKgValue || packageContentValue ?
                    {
                        productPhysicalDescription: {
                            ...(colorValue ? { color: colorValue } : {}),
                            ...(dimensionsValue ? { dimensions: dimensionsValue } : {}),
                            ...(weightKgValue ? { weightKg: weightKgValue } : {}),
                            ...(packageContentValue ? { packageContent: packageContentValue } : {})
                        }
                    }
                    : {}),
                ...(batteryCapacityValue || batteryTypeValue || backupTimeValue || powerAdapterValue || adapterTypeValue ?
                    {
                        productPower: {
                            ...(batteryCapacityValue ? { batteryCapacity: batteryCapacityValue } : {}),
                            ...(batteryTypeValue ? { batteryType: batteryTypeValue } : {}),
                            ...(backupTimeValue ? { backupTime: backupTimeValue } : {}),
                            ...(powerAdapterValue ? { powerAdapter: powerAdapterValue } : {}),
                            ...(adapterTypeValue ? { adapterType: adapterTypeValue } : {})
                        }
                    }
                    : {}),
                ...(warrantyValue || warrantyDetailsValue || warrantyClaimDurationApproximateValue ?
                    {
                        productWarranty: {
                            ...(warrantyValue ? { warranty: warrantyValue } : {}),
                            ...(warrantyDetailsValue ? { warrantyDetails: warrantyDetailsValue } : {}),
                            ...(warrantyClaimDurationApproximateValue ? { warrantyClaimDurationApproximate: warrantyClaimDurationApproximateValue } : {})
                        }
                    }
                    : {}),
                ...(certificationsValue || bestForValue || specialtyValue || othersValue || countryOfOriginValue || madeInAssembleValue || disclaimerValue ?
                    {
                        productAdditionalInfo: {
                            ...(certificationsValue ? { certifications: certificationsValue } : {}),
                            ...(bestForValue ? { bestFor: bestForValue } : {}),
                            ...(specialtyValue ? { specialty: specialtyValue } : {}),
                            ...(othersValue ? { others: othersValue } : {}),
                            ...(countryOfOriginValue ? { countryOfOrigin: countryOfOriginValue } : {}),
                            ...(madeInAssembleValue ? { madeInAssemble: madeInAssembleValue } : {}),
                            ...(disclaimerValue ? { disclaimer: disclaimerValue } : {})
                        }
                    }
                    : {})
            }

        });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data?.productGeneral?.productModel} has updated successfully!`,
            showConfirmButton: false,
            timer: 1500
        });

    }

    return (
        <>
            {
                isLoading ? <Loading></Loading> : loading ? <Loading></Loading> :
                    <div className="flex items-center justify-center p-12 bg-indigo-100">
                        <div className="mx-auto w-full  bg-base-100 rounded-lg shadow-lg p-4">
                            <h1 className="text-center text-3xl font-bold mb-5">Update Product</h1>


                            <form onSubmit={handleEditing} >
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="names" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Name
                                            </label>
                                            <input type="text" name="names" id="name" placeholder="Enter name" defaultValue={data?.productName}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <label htmlFor="image" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Upload a file
                                        </label>
                                        <label className="block">
                                            <span className="sr-only">Choose profile photo</span>
                                            <input type="file" name='image' onChange="loadFile(event)" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-indigo-400 hover:file:bg-violet-100" />
                                        </label>
                                    </div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Price                </label>
                                            <input type="number" name="price" id="number" placeholder="Enter price" defaultValue={data?.productPrice}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="quantity" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Quantity                </label>
                                            <input type="number" name="quantity" id="number" placeholder="Enter quantity" defaultValue={data?.productQuantity}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                        </div>
                                    </div>
                                </div>




                                {
                                    data?.productGeneral && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product General
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productGeneral?.productBrand && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="brand" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Product Brand
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="brand"
                                                                id="name"
                                                                placeholder="Enter brand"
                                                                defaultValue={data?.productGeneral?.productBrand}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGeneral?.productModel && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="model" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Product Model
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="model"
                                                                id="name"
                                                                placeholder="Enter model"
                                                                defaultValue={data?.productGeneral?.productModel}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGeneral?.productLaptopSeries && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="series" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Product Laptop Series
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="series"
                                                                id="name"
                                                                placeholder="Enter laptop series"
                                                                defaultValue={data?.productGeneral?.productLaptopSeries}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGeneral?.productPartNo && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="part" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Product Part No
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="part"
                                                                id="name"
                                                                placeholder="Enter part no"
                                                                defaultValue={data?.productGeneral?.productPartNo}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productProcessor && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Processor
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productProcessor?.processorBrand && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="processorBrand" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Processor Brand
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="processorBrand"
                                                                id="processorBrand"
                                                                placeholder="Enter brand"
                                                                defaultValue={data?.productProcessor?.processorBrand}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.processorType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="processorType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Processor Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="processorType"
                                                                id="processorType"
                                                                placeholder="Enter type"
                                                                defaultValue={data?.productProcessor?.processorType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.processorGeneration && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="processorGeneration" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Processor Generation
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="processorGeneration"
                                                                id="processorGeneration"
                                                                placeholder="Enter generation"
                                                                defaultValue={data?.productProcessor?.processorGeneration}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.processorModel && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="processorModel" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Processor Model
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="processorModel"
                                                                id="processorModel"
                                                                placeholder="Enter model"
                                                                defaultValue={data?.productProcessor?.processorModel}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.processorCore && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="processorCore" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Processor Core
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="processorCore"
                                                                id="processorCore"
                                                                placeholder="Enter core count"
                                                                defaultValue={data?.productProcessor?.processorCore}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.performanceCores && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="performanceCores" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Performance Cores
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="performanceCores"
                                                                id="performanceCores"
                                                                placeholder="Enter performance cores"
                                                                defaultValue={data?.productProcessor?.performanceCores}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productProcessor?.efficientCores && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="efficientCores" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Efficient Cores
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="efficientCores"
                                                                id="efficientCores"
                                                                placeholder="Enter efficient cores"
                                                                defaultValue={data?.productProcessor?.efficientCores}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productMemory && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Memory
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productMemory?.ram && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="ram" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                RAM
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="ram"
                                                                id="ram"
                                                                placeholder="Enter RAM size"
                                                                defaultValue={data?.productMemory?.ram}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productMemory?.installedRAMDetails && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="installedRAMDetails" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Installed RAM Details
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="installedRAMDetails"
                                                                id="installedRAMDetails"
                                                                placeholder="Enter installed RAM details"
                                                                defaultValue={data?.productMemory?.installedRAMDetails}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productMemory?.ramType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="ramType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                RAM Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="ramType"
                                                                id="ramType"
                                                                placeholder="Enter RAM type"
                                                                defaultValue={data?.productMemory?.ramType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productMemory?.totalRAMSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="totalRAMSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Total RAM Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="totalRAMSlot"
                                                                id="totalRAMSlot"
                                                                placeholder="Enter total RAM slots"
                                                                defaultValue={data?.productMemory?.totalRAMSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productMemory?.emptyExpansionRAMSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="emptyExpansionRAMSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Empty Expansion RAM Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="emptyExpansionRAMSlot"
                                                                id="emptyExpansionRAMSlot"
                                                                placeholder="Enter empty expansion RAM slot availability"
                                                                defaultValue={data?.productMemory?.emptyExpansionRAMSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productMemory?.maxRAMSupport && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="maxRAMSupport" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Max RAM Support
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="maxRAMSupport"
                                                                id="maxRAMSupport"
                                                                placeholder="Enter max RAM support"
                                                                defaultValue={data?.productMemory?.maxRAMSupport}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productStorage && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Storage
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productStorage?.storage && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="storage" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Storage
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="storage"
                                                                id="storage"
                                                                placeholder="Enter storage details"
                                                                defaultValue={data?.productStorage?.storage}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.installedHDDType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="installedHDDType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Installed HDD Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="installedHDDType"
                                                                id="installedHDDType"
                                                                placeholder="Enter installed HDD type"
                                                                defaultValue={data?.productStorage?.installedHDDType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.hddRPM && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="hddRPM" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                HDD RPM
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="hddRPM"
                                                                id="hddRPM"
                                                                placeholder="Enter HDD RPM"
                                                                defaultValue={data?.productStorage?.hddRPM}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.hddExpansionSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="hddExpansionSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                HDD Expansion Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="hddExpansionSlot"
                                                                id="hddExpansionSlot"
                                                                placeholder="Enter HDD expansion slot details"
                                                                defaultValue={data?.productStorage?.hddExpansionSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.installedSSDType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="installedSSDType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Installed SSD Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="installedSSDType"
                                                                id="installedSSDType"
                                                                placeholder="Enter installed SSD type"
                                                                defaultValue={data?.productStorage?.installedSSDType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.m2ssdExpansionSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="m2ssdExpansionSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                M.2 SSD Expansion Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="m2ssdExpansionSlot"
                                                                id="m2ssdExpansionSlot"
                                                                placeholder="Enter M.2 SSD expansion slot details"
                                                                defaultValue={data?.productStorage?.m2ssdExpansionSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productStorage?.storageUpgrade && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="storageUpgrade" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Storage Upgrade
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="storageUpgrade"
                                                                id="storageUpgrade"
                                                                placeholder="Enter storage upgrade details"
                                                                defaultValue={data?.productStorage?.storageUpgrade}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productGraphics && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Graphics
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productGraphics?.graphicsChipset && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="graphicsChipset" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Graphics Chipset
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="graphicsChipset"
                                                                id="graphicsChipset"
                                                                placeholder="Enter graphics chipset"
                                                                defaultValue={data?.productGraphics?.graphicsChipset}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGraphics?.graphicsMemoryAccessibility && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="graphicsMemoryAccessibility" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Graphics Memory Accessibility
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="graphicsMemoryAccessibility"
                                                                id="graphicsMemoryAccessibility"
                                                                placeholder="Enter graphics memory accessibility"
                                                                defaultValue={data?.productGraphics?.graphicsMemoryAccessibility}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGraphics?.graphicsMemory && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="graphicsMemory" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Graphics Memory
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="graphicsMemory"
                                                                id="graphicsMemory"
                                                                placeholder="Enter graphics memory"
                                                                defaultValue={data?.productGraphics?.graphicsMemory}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productGraphics?.graphicsMemoryType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="graphicsMemoryType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Graphics Memory Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="graphicsMemoryType"
                                                                id="graphicsMemoryType"
                                                                placeholder="Enter graphics memory type"
                                                                defaultValue={data?.productGraphics?.graphicsMemoryType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productDisplay && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Display
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {data?.productDisplay.displaySizeInch && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displaySizeInch" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Size (Inch)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displaySizeInch"
                                                                id="displaySizeInch"
                                                                placeholder="Enter display size"
                                                                defaultValue={data?.productDisplay.displaySizeInch}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productDisplay.displayType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displayType"
                                                                id="displayType"
                                                                placeholder="Enter display type"
                                                                defaultValue={data?.productDisplay.displayType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {data?.productDisplay.panelType && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="panelType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Panel Type
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="panelType"
                                                                id="panelType"
                                                                placeholder="Enter panel type"
                                                                defaultValue={data?.productDisplay.panelType}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Resolution */}
                                                {data?.productDisplay.displayResolution && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayResolution" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Resolution
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displayResolution"
                                                                id="displayResolution"
                                                                placeholder="Enter display resolution"
                                                                defaultValue={data?.productDisplay.displayResolution}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Surface */}
                                                {data?.productDisplay.displaySurface && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displaySurface" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Surface
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displaySurface"
                                                                id="displaySurface"
                                                                placeholder="Enter display surface"
                                                                defaultValue={data?.productDisplay.displaySurface}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Touch Screen */}
                                                {data?.productDisplay.touchScreen && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="touchScreen" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Touch Screen
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="touchScreen"
                                                                id="touchScreen"
                                                                placeholder="Enter touch screen availability"
                                                                defaultValue={data?.productDisplay.touchScreen}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Refresh Rate */}
                                                {data?.productDisplay.displayRefreshRate && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayRefreshRate" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Refresh Rate
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displayRefreshRate"
                                                                id="displayRefreshRate"
                                                                placeholder="Enter display refresh rate"
                                                                defaultValue={data?.productDisplay.displayRefreshRate}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Bezel */}
                                                {data?.productDisplay.displayBezel && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayBezel" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Bezel
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displayBezel"
                                                                id="displayBezel"
                                                                placeholder="Enter display bezel type"
                                                                defaultValue={data?.productDisplay.displayBezel}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Brightness */}
                                                {data?.productDisplay.brightness && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="brightness" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Brightness
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="brightness"
                                                                id="brightness"
                                                                placeholder="Enter display brightness"
                                                                defaultValue={data?.productDisplay.brightness}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Features */}
                                                {data?.productDisplay.displayFeatures && (
                                                    <div className="w-full px-3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayFeatures" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Features
                                                            </label>
                                                            <textarea
                                                                name="displayFeatures"
                                                                id="displayFeatures"
                                                                rows="3"
                                                                placeholder="Enter display features"
                                                                defaultValue={data?.productDisplay.displayFeatures}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] resize-none outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Secondary Screen Size */}
                                                {data?.productDisplay.secondaryScreenSize && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="secondaryScreenSize" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Secondary Screen Size
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="secondaryScreenSize"
                                                                id="secondaryScreenSize"
                                                                placeholder="Enter secondary screen size"
                                                                defaultValue={data?.productDisplay.secondaryScreenSize}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Secondary Screen Technology */}
                                                {data?.productDisplay.secondaryScreenTechnology && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="secondaryScreenTechnology" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Secondary Screen Technology
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="secondaryScreenTechnology"
                                                                id="secondaryScreenTechnology"
                                                                placeholder="Enter secondary screen technology"
                                                                defaultValue={data?.productDisplay.secondaryScreenTechnology}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Secondary Screen Resolution */}
                                                {data?.productDisplay.secondaryScreenResolution && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="secondaryScreenResolution" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Secondary Screen Resolution
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="secondaryScreenResolution"
                                                                id="secondaryScreenResolution"
                                                                placeholder="Enter secondary screen resolution"
                                                                defaultValue={data?.productDisplay.secondaryScreenResolution}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productPortsAndSlots && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Ports & Slots
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">

                                                {/* Optical Drive */}
                                                {data?.productPortsAndSlots.opticalDrive && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="opticalDrive" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Optical Drive
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="opticalDrive"
                                                                id="opticalDrive"
                                                                placeholder="Enter optical drive availability"
                                                                defaultValue={data?.productPortsAndSlots.opticalDrive}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Multimedia Card Slot */}
                                                {data?.productPortsAndSlots.multimediaCardSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="multimediaCardSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Multimedia Card Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="multimediaCardSlot"
                                                                id="multimediaCardSlot"
                                                                placeholder="Enter multimedia card slot availability"
                                                                defaultValue={data?.productPortsAndSlots.multimediaCardSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Supported Multimedia Card */}
                                                {data?.productPortsAndSlots.supportedMultimediaCard && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="supportedMultimediaCard" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Supported Multimedia Card
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="supportedMultimediaCard"
                                                                id="supportedMultimediaCard"
                                                                placeholder="Enter supported multimedia card"
                                                                defaultValue={data?.productPortsAndSlots.supportedMultimediaCard}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* USB 2.0 Port */}
                                                {data?.productPortsAndSlots.usb2Port && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="usb2Port" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                USB 2.0 Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="usb2Port"
                                                                id="usb2Port"
                                                                placeholder="Enter USB 2.0 port availability"
                                                                defaultValue={data?.productPortsAndSlots.usb2Port}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* USB 3.0 Port */}
                                                {data?.productPortsAndSlots.usb3Port && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="usb3Port" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                USB 3.0 Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="usb3Port"
                                                                id="usb3Port"
                                                                placeholder="Enter USB 3.0 port availability"
                                                                defaultValue={data?.productPortsAndSlots.usb3Port}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* USB-C Thunderbolt Port */}
                                                {data?.productPortsAndSlots.usbCThunderboltPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="usbCThunderboltPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                USB-C Thunderbolt Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="usbCThunderboltPort"
                                                                id="usbCThunderboltPort"
                                                                placeholder="Enter USB-C Thunderbolt port details"
                                                                defaultValue={data?.productPortsAndSlots.usbCThunderboltPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* HDMI Port */}
                                                {data?.productPortsAndSlots.hdmiPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="hdmiPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                HDMI Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="hdmiPort"
                                                                id="hdmiPort"
                                                                placeholder="Enter HDMI port availability"
                                                                defaultValue={data?.productPortsAndSlots.hdmiPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Micro HDMI Port */}
                                                {data?.productPortsAndSlots.microHdmiPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="microHdmiPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Micro HDMI Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="microHdmiPort"
                                                                id="microHdmiPort"
                                                                placeholder="Enter micro HDMI port availability"
                                                                defaultValue={data?.productPortsAndSlots.microHdmiPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Mini HDMI Port */}
                                                {data?.productPortsAndSlots.miniHdmiPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="miniHdmiPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Mini HDMI Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="miniHdmiPort"
                                                                id="miniHdmiPort"
                                                                placeholder="Enter mini HDMI port availability"
                                                                defaultValue={data?.productPortsAndSlots.miniHdmiPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Display Port */}
                                                {data?.productPortsAndSlots.displayPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="displayPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Display Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="displayPort"
                                                                id="displayPort"
                                                                placeholder="Enter display port availability"
                                                                defaultValue={data?.productPortsAndSlots.displayPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Mini DisplayPort */}
                                                {data?.productPortsAndSlots.miniDisplayPort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="miniDisplayPort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Mini DisplayPort
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="miniDisplayPort"
                                                                id="miniDisplayPort"
                                                                placeholder="Enter mini DisplayPort availability"
                                                                defaultValue={data?.productPortsAndSlots.miniDisplayPort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* VGA D-Sub Port */}
                                                {data?.productPortsAndSlots.vgaDSub && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="vgaDSub" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                VGA D-Sub Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="vgaDSub"
                                                                id="vgaDSub"
                                                                placeholder="Enter VGA D-Sub port availability"
                                                                defaultValue={data?.productPortsAndSlots.vgaDSub}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Headphone Port */}
                                                {data?.productPortsAndSlots.headphonePort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="headphonePort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Headphone Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="headphonePort"
                                                                id="headphonePort"
                                                                placeholder="Enter headphone port type"
                                                                defaultValue={data?.productPortsAndSlots.headphonePort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Microphone Port */}
                                                {data?.productPortsAndSlots.microphonePort && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="microphonePort" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Microphone Port
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="microphonePort"
                                                                id="microphonePort"
                                                                placeholder="Enter microphone port type"
                                                                defaultValue={data?.productPortsAndSlots.microphonePort}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Security Lock Slot */}
                                                {data?.productPortsAndSlots.securityLockSlot && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="securityLockSlot" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Security Lock Slot
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="securityLockSlot"
                                                                id="securityLockSlot"
                                                                placeholder="Enter security lock slot availability"
                                                                defaultValue={data?.productPortsAndSlots.securityLockSlot}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    data?.productNetworkConnectivity && (
                                        <div className="mb-5 pt-3">
                                            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                                Product Network Connectivity
                                            </label>
                                            <div className="-mx-3 flex flex-wrap">
                                                {/* LAN */}
                                                {data.productNetworkConnectivity.lan && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="lan" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                LAN
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="lan"
                                                                id="lan"
                                                                placeholder="Enter LAN availability"
                                                                defaultValue={data.productNetworkConnectivity.lan}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Wi-Fi */}
                                                {data.productNetworkConnectivity.wiFi && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="wiFi" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Wi-Fi
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="wiFi"
                                                                id="wiFi"
                                                                placeholder="Enter Wi-Fi availability"
                                                                defaultValue={data.productNetworkConnectivity.wiFi}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Bluetooth */}
                                                {data.productNetworkConnectivity.bluetooth && (
                                                    <div className="w-full px-3 sm:w-1/3">
                                                        <div className="mb-5">
                                                            <label htmlFor="bluetooth" className="mb-3 block text-base font-medium text-[#07074D]">
                                                                Bluetooth
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="bluetooth"
                                                                id="bluetooth"
                                                                placeholder="Enter Bluetooth version"
                                                                defaultValue={data.productNetworkConnectivity.bluetooth}
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }


                                {data?.productAudioCamera && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Audio & Camera
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Audio Properties */}
                                            {data.productAudioCamera.audioProperties && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="audioProperties" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Audio Properties
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="audioProperties"
                                                            id="audioProperties"
                                                            placeholder="Enter audio properties"
                                                            defaultValue={data.productAudioCamera.audioProperties}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Speaker */}
                                            {data.productAudioCamera.speaker && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="speaker" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Speaker
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="speaker"
                                                            id="speaker"
                                                            placeholder="Enter speaker availability"
                                                            defaultValue={data.productAudioCamera.speaker}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Microphone */}
                                            {data.productAudioCamera.microphone && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="microphone" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Microphone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="microphone"
                                                            id="microphone"
                                                            placeholder="Enter microphone availability"
                                                            defaultValue={data.productAudioCamera.microphone}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Webcam */}
                                            {data.productAudioCamera.webCam && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="webCam" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Webcam
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="webCam"
                                                            id="webCam"
                                                            placeholder="Enter webcam details"
                                                            defaultValue={data.productAudioCamera.webCam}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productKeyboard && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Keyboard
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Keyboard Layout */}
                                            {data.productKeyboard.keyboardLayout && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="keyboardLayout" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Keyboard Layout
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="keyboardLayout"
                                                            id="keyboardLayout"
                                                            placeholder="Enter keyboard layout details"
                                                            defaultValue={data.productKeyboard.keyboardLayout}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Keyboard Backlit */}
                                            {data.productKeyboard.keyboardBacklit && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="keyboardBacklit" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Keyboard Backlit
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="keyboardBacklit"
                                                            id="keyboardBacklit"
                                                            placeholder="Enter keyboard backlit availability"
                                                            defaultValue={data.productKeyboard.keyboardBacklit}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* RGB Keyboard */}
                                            {data.productKeyboard.rgbKeyboard && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="rgbKeyboard" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            RGB Keyboard
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="rgbKeyboard"
                                                            id="rgbKeyboard"
                                                            placeholder="Enter RGB keyboard availability"
                                                            defaultValue={data.productKeyboard.rgbKeyboard}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Numeric Keypad */}
                                            {data.productKeyboard.numKeypad && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="numKeypad" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Numeric Keypad
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="numKeypad"
                                                            id="numKeypad"
                                                            placeholder="Enter numeric keypad availability"
                                                            defaultValue={data.productKeyboard.numKeypad}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Pointing Device */}
                                            {data.productKeyboard.pointingDevice && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="pointingDevice" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Pointing Device
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="pointingDevice"
                                                            id="pointingDevice"
                                                            placeholder="Enter pointing device details"
                                                            defaultValue={data.productKeyboard.pointingDevice}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productSecurity && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Security
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Fingerprint Sensor */}
                                            {data.productSecurity.fingerPrintSensor && (
                                                <div className="w-full px-3 sm:w-full">
                                                    <div className="mb-5">
                                                        <label htmlFor="fingerPrintSensor" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Fingerprint Sensor
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="fingerPrintSensor"
                                                            id="fingerPrintSensor"
                                                            placeholder="Enter fingerprint sensor availability"
                                                            defaultValue={data.productSecurity.fingerPrintSensor}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productSoftware && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Software
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Operating System */}
                                            {data.productSoftware.operatingSystem && (
                                                <div className="w-full px-3 sm:w-1/2">
                                                    <div className="mb-5">
                                                        <label htmlFor="operatingSystem" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Operating System
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="operatingSystem"
                                                            id="operatingSystem"
                                                            placeholder="Enter operating system"
                                                            defaultValue={data.productSoftware.operatingSystem}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Licensed Application */}
                                            {data.productSoftware.licensedApplication && (
                                                <div className="w-full px-3 sm:w-1/2">
                                                    <div className="mb-5">
                                                        <label htmlFor="licensedApplication" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Licensed Application
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="licensedApplication"
                                                            id="licensedApplication"
                                                            placeholder="Enter licensed application availability"
                                                            defaultValue={data.productSoftware.licensedApplication}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productPhysicalDescription && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Physical Description
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Color */}
                                            {data.productPhysicalDescription.color && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="color" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Color
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="color"
                                                            id="color"
                                                            placeholder="Enter product color"
                                                            defaultValue={data.productPhysicalDescription.color}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Dimensions */}
                                            {data.productPhysicalDescription.dimensions && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="dimensions" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Dimensions
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="dimensions"
                                                            id="dimensions"
                                                            placeholder="Enter product dimensions"
                                                            defaultValue={data.productPhysicalDescription.dimensions}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Weight (kg) */}
                                            {data.productPhysicalDescription.weightKg && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="weightKg" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Weight (kg)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="weightKg"
                                                            id="weightKg"
                                                            placeholder="Enter product weight in kg"
                                                            defaultValue={data.productPhysicalDescription.weightKg}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Package Content */}
                                            {data.productPhysicalDescription.packageContent && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="packageContent" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Package Content
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="packageContent"
                                                            id="packageContent"
                                                            placeholder="Enter package content details"
                                                            defaultValue={data.productPhysicalDescription.packageContent}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productPower && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Power
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Battery Capacity */}
                                            {data.productPower.batteryCapacity && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="batteryCapacity" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Battery Capacity
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="batteryCapacity"
                                                            id="batteryCapacity"
                                                            placeholder="Enter battery capacity"
                                                            defaultValue={data.productPower.batteryCapacity}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Battery Type */}
                                            {data.productPower.batteryType && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="batteryType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Battery Type
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="batteryType"
                                                            id="batteryType"
                                                            placeholder="Enter battery type"
                                                            defaultValue={data.productPower.batteryType}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Backup Time */}
                                            {data.productPower.backupTime && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="backupTime" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Backup Time
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="backupTime"
                                                            id="backupTime"
                                                            placeholder="Enter backup time"
                                                            defaultValue={data.productPower.backupTime}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Power Adapter */}
                                            {data.productPower.powerAdapter && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="powerAdapter" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Power Adapter
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="powerAdapter"
                                                            id="powerAdapter"
                                                            placeholder="Enter power adapter details"
                                                            defaultValue={data.productPower.powerAdapter}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Adapter Type */}
                                            {data.productPower.adapterType && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="adapterType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Adapter Type
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="adapterType"
                                                            id="adapterType"
                                                            placeholder="Enter adapter type"
                                                            defaultValue={data.productPower.adapterType}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productWarranty && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Warranty
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Warranty */}
                                            {data.productWarranty.warranty && (
                                                <div className="w-full px-3 sm:w-1/3">
                                                    <div className="mb-5">
                                                        <label htmlFor="warranty" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Warranty
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="warranty"
                                                            id="warranty"
                                                            placeholder="Enter warranty period"
                                                            defaultValue={data.productWarranty.warranty}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Warranty Details */}
                                            {data.productWarranty.warrantyDetails && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="warrantyDetails" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Warranty Details
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="warrantyDetails"
                                                            id="warrantyDetails"
                                                            placeholder="Enter warranty details"
                                                            defaultValue={data.productWarranty.warrantyDetails}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Warranty Claim Duration */}
                                            {data.productWarranty.warrantyClaimDurationApproximate && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="warrantyClaimDurationApproximate" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Warranty Claim Duration
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="warrantyClaimDurationApproximate"
                                                            id="warrantyClaimDurationApproximate"
                                                            placeholder="Enter warranty claim duration"
                                                            defaultValue={data.productWarranty.warrantyClaimDurationApproximate}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                                {data?.productAdditionalInfo && (
                                    <div className="mb-5 pt-3">
                                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                            Product Additional Information
                                        </label>
                                        <div className="-mx-3 flex flex-wrap">
                                            {/* Certifications */}
                                            {data.productAdditionalInfo.certifications && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="certifications" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Certifications
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="certifications"
                                                            id="certifications"
                                                            placeholder="Enter certifications"
                                                            defaultValue={data.productAdditionalInfo.certifications}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Best For */}
                                            {data.productAdditionalInfo.bestFor && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="bestFor" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Best For
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="bestFor"
                                                            id="bestFor"
                                                            placeholder="Enter best for"
                                                            defaultValue={data.productAdditionalInfo.bestFor}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Specialty */}
                                            {data.productAdditionalInfo.specialty && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="specialty" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Specialty
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="specialty"
                                                            id="specialty"
                                                            placeholder="Enter specialty"
                                                            defaultValue={data.productAdditionalInfo.specialty}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Others */}
                                            {data.productAdditionalInfo.others && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="others" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Others
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="others"
                                                            id="others"
                                                            placeholder="Enter other details"
                                                            defaultValue={data.productAdditionalInfo.others}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Country of Origin */}
                                            {data.productAdditionalInfo.countryOfOrigin && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="countryOfOrigin" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Country of Origin
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="countryOfOrigin"
                                                            id="countryOfOrigin"
                                                            placeholder="Enter country of origin"
                                                            defaultValue={data.productAdditionalInfo.countryOfOrigin}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Made in Assemble */}
                                            {data.productAdditionalInfo.madeInAssemble && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="madeInAssemble" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Made in Assemble
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="madeInAssemble"
                                                            id="madeInAssemble"
                                                            placeholder="Enter made in assemble details"
                                                            defaultValue={data.productAdditionalInfo.madeInAssemble}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Disclaimer */}
                                            {data.productAdditionalInfo.disclaimer && (
                                                <div className="w-full px-3">
                                                    <div className="mb-5">
                                                        <label htmlFor="disclaimer" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Disclaimer
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="disclaimer"
                                                            id="disclaimer"
                                                            placeholder="Enter disclaimer"
                                                            defaultValue={data.productAdditionalInfo.disclaimer}
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}



                                <div>
                                    <button
                                        className="hover:shadow-form w-full rounded-md bg-indigo-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                        Update product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

            }
        </>
    );
};

export default Update;