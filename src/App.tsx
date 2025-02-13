import { FC, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { ReactComponent as SettingsIconSVG } from "./assets/settings.svg";
import Chats from "./components/Chats";
import Default from "./components/Default";
import Info from "./components/Info";

import Settings from "./components/Settings";
import { channelState } from "./states/channel";
import { settingsState } from "./states/settings";

const App: FC = () => {
  const [channel, setChannel] = useRecoilState(channelState);
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    Twitch.ext.onAuthorized((auth) => {
      const { channelId } = auth;

      (async () => {
        const response = await fetch(
          `https://api.wakscord.xyz/extension/${channelId}`
        );

        const data = await response.json();

        setChannel({
          twitchId: channelId,
          ...data,
        });
      })();
    });
  }, []);

  if (!channel || !channel.id) {
    return <Default />;
  }

  return (
    <>
      <Settings />

      <Container>
        <SettingButtonContainer>
          <SettingsIcon
            width={20}
            height={20}
            onClick={() => {
              setSettings({
                ...settings,
                isOpen: true,
              });
            }}
          />
        </SettingButtonContainer>

        <ChatsConainer>
          <Chats
            id={channel.id}
            twitchId={channel.twitchId}
            name={channel.name}
          />
        </ChatsConainer>

        <Info channel={channel} />
      </Container>
    </>
  );
};

const SettingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  padding: 5px;
  box-sizing: border-box;
  height: 30px;
`;

const SettingsIcon = styled(SettingsIconSVG)`
  cursor: pointer;
`;

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const ChatsConainer = styled.div`
  height: calc(100vh - 104px);

  box-sizing: border-box;
  padding-bottom: 10px;
`;

export default App;
