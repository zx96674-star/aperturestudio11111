"use client";

export interface SubjectAttributes {
  setting: string;
  lighting: string;
  palette: string;
  mood: string;
}

const SETTINGS = ["Studio", "Outdoor", "Urban", "Interior", "Abstract void"];
const LIGHTING = ["Soft daylight", "Golden hour", "Studio strobe", "Moody low-key", "Neon"];
const PALETTES = ["Warm neutrals", "Cool tones", "Monochrome", "High contrast", "Pastel"];
const MOODS = ["Calm", "Energetic", "Dramatic", "Whimsical", "Minimal"];

interface CharacterSettingsProps {
  value: SubjectAttributes;
  onChange: (v: SubjectAttributes) => void;
}

function FieldSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="label-eyebrow">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="control-input mt-1.5 w-full px-3 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CharacterSettings({
  value,
  onChange,
}: CharacterSettingsProps) {
  const set = (key: keyof SubjectAttributes) => (v: string) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="panel p-4 sm:p-5">
      <span className="label-eyebrow">Subject settings</span>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldSelect label="Setting" options={SETTINGS} value={value.setting} onChange={set("setting")} />
        <FieldSelect label="Lighting" options={LIGHTING} value={value.lighting} onChange={set("lighting")} />
        <FieldSelect label="Palette" options={PALETTES} value={value.palette} onChange={set("palette")} />
        <FieldSelect label="Mood" options={MOODS} value={value.mood} onChange={set("mood")} />
      </div>
    </div>
  );
}
