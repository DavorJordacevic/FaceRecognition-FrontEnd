#!/bin/bash

rm nohup.out
nohup npm run start 2>&1 &
echo $! > save_pid.pid

echo "FRAPP_FRONTEND started successfully with PID: $!"