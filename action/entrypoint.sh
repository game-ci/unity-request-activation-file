#!/usr/bin/env bash

#
# Display the unity version
#

echo "Retrieving manual activation file for unity version \"$UNITY_VERSION\"."


# Determine the expected file name and path
FILE_NAME=Unity_v$UNITY_VERSION.alf
FILE_PATH=$FILE_NAME

# Request the manual activation file for activating unity personal
unity-editor \
  -batchmode \
  -nographics \
  -logFile /dev/stdout \
  -quit \
  -createManualActivationFile

# Catch exit code
UNITY_EXIT_CODE=$?

# Output the resulting file by copying
cp $FILE_NAME $HOME/$FILE_PATH

# Set resulting name as output variable
echo ::set-output name=filePath::$FILE_PATH

if [[ $UNITY_EXIT_CODE -eq 0 ]] || [[ $UNITY_EXIT_CODE -eq 1 ]]; then
  echo ""
  echo "###########################"
  echo "#        Succeeded        #"
  echo "###########################"
  echo ""
  echo "1. Use the file \"$FILE_PATH\" for manual activation at https://license.unity3d.com/manual"
  echo "2. Create a GitHub secret with the content of the resulting license file"
  echo "3. set the \$UNITY_LICENSE variable to your newly created secret"
  echo "For more information see https://game.ci/docs/github/activation"
  echo ""
  # Unity exits with exit code 1 for success cases
  exit 0
else
  echo ""
  echo "###########################"
  echo "#         Failure         #"
  echo "###########################"
  echo ""
  echo "Please note that the exit code is not very descriptive."
  echo "Most likely it will not help you solve the issue."
  echo ""
  echo "To find the reason for failure: please search for errors in the log above."
  echo ""
  exit $UNITY_EXIT_CODE
fi



