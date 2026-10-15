'use client'

import { Select, Toggle } from '@/components'
import { SETTINGS } from '@/data'
import { useViewer } from '@/hooks'
import { SettingsCard } from '../components/SettingsCard'

export function Playback() {
    const { viewer, setPrefs } = useViewer()
    const { prefs } = viewer
    const copy = SETTINGS.playback

    return (
        <SettingsCard title={copy.title} delay={0.1}>
            <div className="divide-y divide-line">
                <Toggle label={copy.autoplay} description={copy.autoplayText} checked={prefs.autoplay} onChange={(autoplay) => setPrefs({ autoplay })} />

                <Toggle label={copy.subtitles} description={copy.subtitlesText} checked={prefs.subtitles} onChange={(subtitles) => setPrefs({ subtitles })} />

                <Toggle label={copy.dataSaver} description={copy.dataSaverText} checked={prefs.dataSaver} onChange={(dataSaver) => setPrefs({ dataSaver })} />

                <div className="pt-4">
                    <Select
                        name="quality"
                        label={copy.quality}
                        options={copy.qualities}
                        value={prefs.quality}
                        onChange={(event) => setPrefs({ quality: event.target.value })}
                        formGroupClass="mb-0"
                    />
                </div>
            </div>
        </SettingsCard>
    )
}
