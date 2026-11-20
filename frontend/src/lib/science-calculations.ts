// Values follow SI definitions and the 2022 CODATA recommendations published by NIST.
export const SPEED_OF_LIGHT = 299_792_458; // m/s, exact
export const PLANCK_CONSTANT = 6.626_070_15e-34; // J Hz^-1, exact
export const ELEMENTARY_CHARGE = 1.602_176_634e-19; // C, exact
export const GRAVITATIONAL_CONSTANT = 6.674_30e-11; // m^3 kg^-1 s^-2

export const ASTRONOMICAL_UNIT = 149_597_870_700; // m, exact
export const LIGHT_YEAR = 9.460_730_472_580_8e15; // m
export const PARSEC = 3.085_677_581_491_367e16; // m
export const EARTH_MASS = 5.9722e24; // kg
export const EARTH_MEAN_RADIUS = 6.371e6; // m
export const STANDARD_GRAVITY = 9.806_65; // m/s², exact; converts specific impulse in seconds to exhaust speed

export type DistanceUnit = 'km' | 'au' | 'light-year' | 'parsec';

const DISTANCE_IN_METERS: Record<DistanceUnit, number> = {
  km: 1_000,
  au: ASTRONOMICAL_UNIT,
  'light-year': LIGHT_YEAR,
  parsec: PARSEC,
};

function requirePositive(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be greater than zero.`);
  }
}

export function calculateLightTravelTime(distance: number, unit: DistanceUnit) {
  requirePositive(distance, 'Distance');
  const meters = distance * DISTANCE_IN_METERS[unit];
  return {
    meters,
    seconds: meters / SPEED_OF_LIGHT,
  };
}

export function calculatePhotonFromWavelength(wavelengthNm: number) {
  requirePositive(wavelengthNm, 'Wavelength');
  const wavelengthMeters = wavelengthNm * 1e-9;
  const frequencyHz = SPEED_OF_LIGHT / wavelengthMeters;
  const energyJoules = PLANCK_CONSTANT * frequencyHz;
  return {
    wavelengthMeters,
    frequencyHz,
    energyJoules,
    energyElectronVolts: energyJoules / ELEMENTARY_CHARGE,
  };
}

export function describeSpectrum(wavelengthNm: number) {
  if (wavelengthNm < 0.01) return 'Gamma ray';
  if (wavelengthNm < 10) return 'X-ray';
  if (wavelengthNm < 380) return 'Ultraviolet';
  if (wavelengthNm <= 450) return 'Visible violet';
  if (wavelengthNm <= 485) return 'Visible blue';
  if (wavelengthNm <= 500) return 'Visible cyan';
  if (wavelengthNm <= 565) return 'Visible green';
  if (wavelengthNm <= 590) return 'Visible yellow';
  if (wavelengthNm <= 625) return 'Visible orange';
  if (wavelengthNm <= 750) return 'Visible red';
  if (wavelengthNm < 1e6) return 'Infrared';
  if (wavelengthNm < 1e9) return 'Microwave';
  return 'Radio wave';
}

export function calculateTimeDilation(speedPercentOfLight: number, stationaryYears: number) {
  requirePositive(speedPercentOfLight, 'Speed');
  requirePositive(stationaryYears, 'Elapsed time');
  if (speedPercentOfLight >= 100) {
    throw new RangeError('An object with mass must travel below 100% of light speed.');
  }

  const beta = speedPercentOfLight / 100;
  const lorentzFactor = 1 / Math.sqrt(1 - beta ** 2);
  const travelerYears = stationaryYears / lorentzFactor;
  return {
    beta,
    lorentzFactor,
    stationaryYears,
    travelerYears,
    differenceYears: stationaryYears - travelerYears,
  };
}

export function calculateEscapeVelocity(massInEarths: number, radiusInEarths: number) {
  requirePositive(massInEarths, 'Mass');
  requirePositive(radiusInEarths, 'Radius');

  const massKg = massInEarths * EARTH_MASS;
  const radiusMeters = radiusInEarths * EARTH_MEAN_RADIUS;
  const escapeVelocityMps = Math.sqrt((2 * GRAVITATIONAL_CONSTANT * massKg) / radiusMeters);
  const surfaceGravityMps2 = (GRAVITATIONAL_CONSTANT * massKg) / radiusMeters ** 2;
  return {
    massKg,
    radiusMeters,
    escapeVelocityMps,
    escapeVelocityKps: escapeVelocityMps / 1_000,
    surfaceGravityMps2,
  };
}

// Tsiolkovsky rocket equation: ideal change in velocity from burning propellant,
// with no gravity or drag losses. Masses only need consistent units, so tonnes are used.
export function calculateRocketDeltaV(specificImpulseSeconds: number, initialMassTonnes: number, finalMassTonnes: number) {
  requirePositive(specificImpulseSeconds, 'Specific impulse');
  requirePositive(initialMassTonnes, 'Initial mass');
  requirePositive(finalMassTonnes, 'Final mass');
  if (finalMassTonnes >= initialMassTonnes) {
    throw new RangeError('Final mass must be smaller than initial mass.');
  }

  const exhaustVelocityMps = specificImpulseSeconds * STANDARD_GRAVITY;
  const massRatio = initialMassTonnes / finalMassTonnes;
  const deltaVMps = exhaustVelocityMps * Math.log(massRatio);
  return {
    exhaustVelocityMps,
    massRatio,
    deltaVMps,
    deltaVKps: deltaVMps / 1_000,
    propellantTonnes: initialMassTonnes - finalMassTonnes,
    propellantFraction: 1 - finalMassTonnes / initialMassTonnes,
  };
}
