import styles from "./TutorAvatar.module.css";

export type AvatarState = "idle" | "thinking" | "talking";

type Props = {
  size?: number;
  state?: AvatarState;
  className?: string;
};

export function TutorAvatar({ size = 56, state = "idle", className }: Props) {
  return (
    <svg
      className={[styles.avatar, styles[state], className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tutor-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="55%" stopColor="#ff7448" />
          <stop offset="100%" stopColor="#ff5e3a" />
        </linearGradient>
      </defs>
      <g className={styles.body}>
        <path
          d="M32 4c13.5 0 24 8.6 26.6 21.4 2.4 11.9-2 24-12.6 30.2C38.8 59.8 25.2 59.8 18 55.6 7.4 49.4 3 37.3 5.4 25.4 8 12.6 18.5 4 32 4Z"
          fill="url(#tutor-body)"
        />
        <ellipse cx="22" cy="16" rx="7" ry="4" fill="#fff" opacity="0.22" transform="rotate(-24 22 16)" />
        <circle cx="16.5" cy="38" r="4" fill="#ffc8b7" opacity="0.7" />
        <circle cx="47.5" cy="38" r="4" fill="#ffc8b7" opacity="0.7" />
        <g className={styles.eyes}>
          <ellipse className={styles.eye} cx="24" cy="30" rx="3.4" ry="4.6" fill="#0f151d" />
          <ellipse className={styles.eye} cx="40" cy="30" rx="3.4" ry="4.6" fill="#0f151d" />
        </g>
        <path className={styles.smile} d="M27 40.5c2.8 2.6 7.2 2.6 10 0" fill="none" stroke="#0f151d" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse className={styles.mouth} cx="32" cy="41.5" rx="3.2" ry="2.4" fill="#0f151d" />
      </g>
    </svg>
  );
}
