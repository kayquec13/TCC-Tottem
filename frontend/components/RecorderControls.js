import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { formatMinutes, formatSeconds } from "../utils/formatTime";
import { useEffect, useState } from "react";
import useRecorder from "../hooks/useRecorder";
import { transcript } from "../services/voice";
import { CircularProgress } from "@mui/material";

export default function RecorderControls({ setData, fieldType, showRest = true }) {
	const [loading, setLoading] = useState(false);
	const { recorderState, ...handlers } = useRecorder();

	const { audio, mediaStream, recordingMinutes, recordingSeconds, initRecording } = recorderState;
	const { startRecording, saveRecording, cancelRecording } = handlers;

	const transcriptAudio = async () => {
		setLoading(true);
		try {
			const res = await transcript(audio, fieldType);
			setData(res.data.message);
		} catch (e) {
			//
		}
		setLoading(false);
	}

	useEffect(() => {
		if (audio != null) {
			transcriptAudio(audio);
		}
	}, [audio]);

	return (
		<div className="controls-container" style={!showRest && { justifyContent: 'center' }}>
			{showRest ?
				(!loading ?
					<>
						<div className="start-button-container">
							{initRecording ? (
								<button
									className="start-button"
									title="Salvar"
									disabled={recordingSeconds === 0}
									onClick={saveRecording}
								>
									<FontAwesomeIcon icon={faSave} />
								</button>
							) : (
								<button className="start-button" style={showRest ? { marginRight: 10 } : { fontSize: 40 }} title="Gravar" onClick={startRecording}>
									<FontAwesomeIcon icon={faMicrophone} />
								</button>
							)}
						</div>
						<div className="recorder-display">
							{initRecording && (
								<div className="cancel-button-container">
									<button className="cancel-button" title="Cancelar" onClick={cancelRecording}>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</div>
							)}
							<div className="recording-time">
								<span>{formatMinutes(recordingMinutes)}</span>
								<span>:</span>
								<span>{formatSeconds(recordingSeconds)}</span>
								{initRecording && <div className="recording-indicator"></div>}
							</div>
						</div>
					</>
					: <></>
				) : 
				<button className="start-button" style={showRest ? { marginRight: 10 } : { fontSize: 40 }} title="Gravar" onClick={startRecording}>
					<FontAwesomeIcon icon={faMicrophone} />
				</button>
			} : <CircularProgress color={"inherit"} size={17} style={{ marginLeft: 12, marginTop: 4 }} />
		</div>
	);
}
