import { FC } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as WakscordLogo } from "../assets/wakscord.svg";
import { Color, getColor } from "../colors";
import { Channel } from "../states/channel";

interface InfoProps {
  channel: Channel;
}

const Info: FC<InfoProps> = ({ channel }) => {
  const colors: Color = getColor(channel.name);

  return (
    <Container color={colors.bottom}>
      <Texts color={colors.text}>
        <Name>{channel.name}</Name>
        {channel.info && (
          <Link
            href={`https://cafe.naver.com/steamindiegame/${channel.info.idx}`}
            target="_blank"
          >
            {channel.info.date} 뱅온정보: {channel.info.status}
          </Link>
        )}
      </Texts>

      <LogoContainer>
        <WakscordLogo width={80} fill={colors.text} />
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  height: 100px;
  padding: 10px;

  display: flex;
  align-items: center;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}
`;

const Texts = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

const Name = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

const Text = styled.span``;

const Link = styled.a`
  text-decoration: underline;
  color: white;
`;

const LogoContainer = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Info;
